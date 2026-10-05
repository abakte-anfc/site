import fs from 'node:fs/promises';
import path from 'node:path';
import ffmpeg from 'ffmpeg-static';
import sharp from 'sharp';
import {spawnSync} from 'node:child_process';
const root=path.resolve(import.meta.dirname,'../..');
const out=path.join(root,'site/assets');
const sources=[
 {name:'fundo-abertura',file:'snapinsta-1791157666077.mp4',start:3,duration:15},
 {name:'fundo-areas',file:'snapinsta-1791157482919.mp4',start:3,duration:12},
 {name:'fundo-registros',file:'snapinsta-1791157436933.mp4',start:3,duration:12}
];
for(const clip of sources){
 const destination=path.join(out,clip.name+'.mp4');
 const result=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-y','-ss',String(clip.start),'-i',path.join(root,'videos',clip.file),'-t',String(clip.duration),'-an','-vf','scale=540:960,fps=24','-c:v','libx264','-crf','28','-preset','medium','-movflags','+faststart',destination],{encoding:'utf8'});
 if(result.status!==0)throw new Error(result.stderr);
 const poster=path.join(out,clip.name+'-source.png');
 const frame=spawnSync(ffmpeg,['-hide_banner','-loglevel','error','-y','-i',destination,'-frames:v','1','-update','1',poster],{encoding:'utf8'});
 if(frame.status!==0)throw new Error(frame.stderr);
 await sharp(poster).webp({quality:75}).toFile(path.join(out,clip.name+'.webp'));
 await fs.unlink(poster);
}
await fs.writeFile(path.join(root,'site/docs/fundos.json'),JSON.stringify(sources.map(s=>({...s,source:'videos/'+s.file,audio:'removido na cópia de fundo; original preservado'})),null,2)+'\n');
console.log('Três vídeos de fundo preparados, sem áudio. Originais preservados.');
