import http from 'node:http';
import { createReadStream, existsSync, statSync } from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.env.PORT || 3000);
const mime = {'.html':'text/html; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.jpg':'image/jpeg','.jpeg':'image/jpeg','.png':'image/png','.webp':'image/webp','.svg':'image/svg+xml','.ico':'image/x-icon'};
const fallback = `<!doctype html><html lang="fr"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Naka Mix</title><style>body{margin:0;background:#0b0c10;color:#f4f4f4;font:16px Arial}.wrap{max-width:900px;margin:12vh auto;padding:32px}h1{font-size:64px}em{color:#d4ff68;font-style:normal}.note{color:#aeb5c0;line-height:1.7;padding:20px;border:1px solid #ffffff25;border-radius:12px}</style><main class="wrap"><small>TON UNIVERS DE STREAMING</small><h1>NAKA<span style="color:#d4ff68">.</span>MIX<br><em>Tout à voir.</em></h1><p class="note">Le serveur Naka Mix est en ligne. La restauration du catalogue et des lecteurs est encore en cours.</p></main></html>`;
const server = http.createServer((req,res) => {
 const url = new URL(req.url || '/', 'http://localhost');
 if(url.pathname === '/api/health'){res.writeHead(200,{'content-type':'application/json'});return res.end(JSON.stringify({ok:true,app:'Naka Mix',root,indexExists:existsSync(path.join(root,'index.html'))}));}
 if(url.pathname.startsWith('/api/')){res.writeHead(503,{'content-type':'application/json'});return res.end(JSON.stringify({error:'API catalogue non configurée.'}));}
 let requested; try{requested=decodeURIComponent(url.pathname==='/'?'/index.html':url.pathname)}catch{res.writeHead(400);return res.end('Bad request')}
 if(requested.includes('\0')){res.writeHead(400);return res.end('Bad request')}
 const file=path.resolve(root,'.'+requested);
 if(!file.startsWith(root+path.sep)){res.writeHead(403);return res.end('Forbidden')}
 if(existsSync(file)&&statSync(file).isFile()){res.writeHead(200,{'content-type':mime[path.extname(file).toLowerCase()]||'application/octet-stream','cache-control':'no-store'});return createReadStream(file).pipe(res)}
 if(url.pathname==='/'){res.writeHead(200,{'content-type':'text/html; charset=utf-8','cache-control':'no-store'});return res.end(fallback)}
 res.writeHead(404,{'content-type':'text/plain; charset=utf-8'});res.end('Not found');
});
server.listen(port,'0.0.0.0',()=>console.log(`Naka Mix listening on ${port}; cwd=${root}; indexExists=${existsSync(path.join(root,'index.html'))}`));
