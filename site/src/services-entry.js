const host=document.querySelector('#services-loop-root');
if(host){
 const start=async()=>{try{const {mountServices}=await import('./ServicesIsland.jsx');mountServices(host);document.querySelector('[data-services-fallback]').hidden=true;}catch{host.hidden=true;}};
 if('IntersectionObserver' in window){const observer=new IntersectionObserver(([entry])=>{if(entry.isIntersecting){observer.disconnect();start();}},{rootMargin:'200px'});observer.observe(host);}else start();
}
