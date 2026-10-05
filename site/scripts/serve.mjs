import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname,'../dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.webp':'image/webp','.png':'image/png','.ttf':'font/ttf','.mp4':'video/mp4','.txt':'text/plain; charset=utf-8'};
const server=http.createServer((req,res)=>{
 let requested;
 try { requested=decodeURIComponent(new URL(req.url,'http://localhost').pathname); } catch {res.writeHead(400);return res.end();}
 const file=path.resolve(root,'.'+(requested==='/'?'/index.html':requested));
 if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
 if(!fs.existsSync(file)||!fs.statSync(file).isFile()){res.writeHead(404);return res.end('Não encontrado');}
 const size=fs.statSync(file).size;
 const headers={'Content-Type':types[path.extname(file)]||'application/octet-stream','X-Content-Type-Options':'nosniff','Cache-Control':'no-cache','Accept-Ranges':'bytes'};
 if(req.headers.range) {
  const m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
  if(!m){res.writeHead(416,{'Content-Range':'bytes */'+size});return res.end();}
  const start=m[1]?Number(m[1]):Math.max(0,size-Number(m[2]));
  const end=m[1]?(m[2]?Math.min(Number(m[2]),size-1):size-1):size-1;
  if(start>end||start>=size){res.writeHead(416,{'Content-Range':'bytes */'+size});return res.end();}
  res.writeHead(206,{...headers,'Content-Range':'bytes '+start+'-'+end+'/'+size,'Content-Length':end-start+1});
  if(req.method==='HEAD')return res.end();return fs.createReadStream(file,{start,end}).pipe(res);
 }
 res.writeHead(200,{...headers,'Content-Length':size});
 if(req.method==='HEAD')return res.end();fs.createReadStream(file).pipe(res);
});
server.listen(4173,'127.0.0.1',()=>console.log('Realizarte: http://127.0.0.1:4173'));
