import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import ffmpeg from 'ffmpeg-static';
import { spawnSync } from 'node:child_process';
const root = path.resolve(import.meta.dirname, '../..');
const out = path.join(root, 'site/assets');
await fs.mkdir(out, {recursive:true});
const photos = (await fs.readdir(path.join(root,'fotos'))).filter(f=>/\.jpe?g$/i.test(f)).sort();
const selections = [
 ['hero',34,'Dançarina em cena, com um tecido claro suspenso no ar.'],
 ['sobre',5,'Dançarina de braços abertos sob a iluminação do palco.'],
 ['registro-01',3,'Bailarinas em movimento com saias claras no palco.'],
 ['registro-02',10,'Grupo de bailarinas de figurino azul com os braços elevados.'],
 ['registro-03',13,'Grupo em uma composição de dança sob a luz do palco.'],
 ['registro-04',14,'Bailarino em um movimento próximo ao chão, em fotografia preto e branco.'],
 ['registro-05',18,'Artistas em uma composição coletiva no palco.'],
 ['registro-06',29,'Dançarina ajoelhada com os braços abertos sob luz quente.']
];
const manifest = [];
for(const [name,num,alt] of selections) {
 const source=path.join(root,'fotos',photos[num-1]);
 const meta=await sharp(source).metadata();
 for(const width of [480,800,1200]) await sharp(source).rotate().resize({width,withoutEnlargement:true}).webp({quality:82}).toFile(path.join(out,name+'-'+width+'.webp'));
 manifest.push({name,source:path.relative(root,source),alt,width:meta.width,height:meta.height});
}
await sharp(path.join(root,'LOGO.jpeg')).extract({left:24,top:304,width:912,height:395}).resize({width:1000}).png().toFile(path.join(out,'logo.png'));
const videoSource=path.join(root,'videos/snapinsta-1791157436933.mp4');
const still=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-y','-ss','3','-i',videoSource,'-frames:v','1','-update','1',path.join(out,'encontro-source.png')],{encoding:'utf8'});
if(still.status!==0)throw new Error(still.stderr);
for(const width of [480,800]) await sharp(path.join(out,'encontro-source.png')).resize({width,withoutEnlargement:true}).webp({quality:82}).toFile(path.join(out,'encontro-'+width+'.webp'));
await fs.unlink(path.join(out,'encontro-source.png'));
manifest.push({name:'encontro',source:path.relative(root,videoSource),time:'00:03',alt:'Três pessoas sentadas juntas, observando fotografias em um celular.',width:720,height:1280});
const performance=path.join(root,'videos/snapinsta-1791157666077.mp4');
const clip=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-y','-ss','3','-i',performance,'-t','15','-an','-vf','scale=540:960','-c:v','libx264','-crf','24','-preset','medium','-movflags','+faststart',path.join(out,'registro-movimento.mp4')],{encoding:'utf8'});
if(clip.status!==0)throw new Error(clip.stderr);
const poster=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-y','-ss','0','-i',path.join(out,'registro-movimento.mp4'),'-frames:v','1','-update','1',path.join(out,'video-source.png')],{encoding:'utf8'});
if(poster.status!==0)throw new Error(poster.stderr);
await sharp(path.join(out,'video-source.png')).webp({quality:82}).toFile(path.join(out,'video-capa.webp'));
await fs.unlink(path.join(out,'video-source.png'));
manifest.push({name:'registro-movimento',source:path.relative(root,performance),start:'00:03',duration:15,audio:'Trecho preparado sem áudio; original preservado.'});
await fs.writeFile(path.join(root,'site/docs/materiais.json'),JSON.stringify(manifest,null,2)+'\n');
console.log('Logo, 8 fotos responsivas, quadro de bastidores e trecho de vídeo preparados.');
