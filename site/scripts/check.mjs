import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
const root=path.resolve(import.meta.dirname,'../dist');
const html=await fs.readFile(path.join(root,'index.html'),'utf8');
const errors=[];
if((html.match(/<h1\b/g)||[]).length!==1)errors.push('Um único h1 é necessário.');
if(!html.includes('lang="pt-BR"'))errors.push('Idioma pt-BR ausente.');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
if(new Set(ids).size!==ids.length)errors.push('IDs duplicados.');
for(const [,ref] of html.matchAll(/(?:src|href|poster|data-source)="([^"]+)"/g)){
 if(ref.startsWith('#')){if(!ids.includes(ref.slice(1)))errors.push('Âncora ausente: '+ref);}
 else if(!/^(https?:|data:)/.test(ref)){try{await fs.access(path.join(root,ref));}catch{errors.push('Arquivo ausente: '+ref);}}
}
for(const [,srcset] of html.matchAll(/srcset="([^"]+)"/g))for(const item of srcset.split(',')){const file=item.trim().split(/\s/)[0];try{await fs.access(path.join(root,file));}catch{errors.push('Srcset ausente: '+file);}}
for(const [,tag] of html.matchAll(/(<img\b[^>]*>)/g))if(!/\balt="/.test(tag)||!/\bwidth="/.test(tag)||!/\bheight="/.test(tag))errors.push('Imagem sem alt ou dimensões: '+tag);
for(const [,tag] of html.matchAll(/(<video\b[^>]*>)/g))if(/\bautoplay\b/.test(tag)&&(!/\bmuted\b/.test(tag)||!/\bplaysinline\b/.test(tag)))errors.push('Autoplay exige vídeo sem áudio e playsinline.');
if(/TODO|TBD|lorem ipsum/i.test(html))errors.push('Preenchimento pendente no conteúdo.');
const result=spawnSync(process.execPath,['--check',path.join(root,'app.js')],{encoding:'utf8'});
if(result.status!==0)errors.push(result.stderr);
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log('Referências locais, âncoras, semântica básica, dimensões e sintaxe: OK.');
