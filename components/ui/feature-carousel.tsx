import * as React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface HeroProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
 title: React.ReactNode;
 subtitle: string;
 images: { src: string; alt: string; title?: string }[];
 onReady?: () => void;
}
export const HeroSection = React.forwardRef<HTMLDivElement, HeroProps>(
 ({title,subtitle,images,className,onReady,...props},ref) => {
 const [currentIndex,setCurrentIndex]=React.useState(Math.floor(images.length/2));
 const [paused,setPaused]=React.useState(false);
 const [hovered,setHovered]=React.useState(false);
 const [focused,setFocused]=React.useState(false);
 const [reduced,setReduced]=React.useState(false);
 const [visible,setVisible]=React.useState(false);
 const host=React.useRef<HTMLDivElement|null>(null);
 const touch=React.useRef<{x:number;y:number}|null>(null);
 const next=React.useCallback(()=>setCurrentIndex(i=>(i+1)%images.length),[images.length]);
 const prev=()=>setCurrentIndex(i=>(i-1+images.length)%images.length);
 React.useEffect(()=>{onReady?.();},[onReady]);
 React.useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));
  if(host.current)observer.observe(host.current);
  return()=>{observer.disconnect();media.removeEventListener('change',update);};
 },[]);
 React.useEffect(()=>{
  if(paused||hovered||focused||reduced||!visible||images.length<2)return;
  const timer=setInterval(()=>{if(!document.hidden)next();},4000);
  return()=>clearInterval(timer);
 },[paused,hovered,focused,reduced,visible,next,images.length]);
 const navigate=(direction:number)=>{setPaused(true);direction>0?next():prev();};
 if(!images.length)return null;
 return <div ref={node=>{host.current=node;if(typeof ref==='function')ref(node);else if(ref)ref.current=node;}}
  className={cn('feature-carousel relative w-full flex flex-col items-center justify-center overflow-x-hidden text-foreground p-4',className)}
  role="region" aria-roledescription="carrossel" aria-label="Registros do Realizarte"
  tabIndex={0} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}
  onFocusCapture={()=>setFocused(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setFocused(false);}}
  onKeyDown={e=>{if(e.target!==e.currentTarget)return;if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();navigate(e.key==='ArrowRight'?1:-1);}else if(e.key==='Home'||e.key==='End'){e.preventDefault();setPaused(true);setCurrentIndex(e.key==='Home'?0:images.length-1);}}}
  onTouchStart={e=>{touch.current={x:e.touches[0].clientX,y:e.touches[0].clientY};}}
  onTouchEnd={e=>{if(!touch.current)return;const dx=e.changedTouches[0].clientX-touch.current.x;const dy=e.changedTouches[0].clientY-touch.current.y;if(Math.abs(dx)>40&&Math.abs(dx)>Math.abs(dy))navigate(dx<0?1:-1);touch.current=null;}}
  {...props}>
  <div className="z-10 flex w-full flex-col items-center text-center gap-6">
   <div className="space-y-3"><h3 className="text-3xl sm:text-4xl font-bold tracking-tight">{title}</h3><p className="max-w-2xl mx-auto text-muted-foreground">{subtitle}</p></div>
   <div className="relative w-full h-[400px] md:h-[480px] flex items-center justify-center">
    <div className="relative w-full h-full flex items-center justify-center [perspective:1000px]">
    {images.map((image,index)=>{
     let pos=(index-currentIndex+images.length)%images.length;if(pos>Math.floor(images.length/2))pos-=images.length;
     const center=pos===0,adjacent=Math.abs(pos)===1;
     return <div key={image.src} data-position={pos} aria-hidden={!center}
      className="absolute w-56 h-[340px] md:w-72 md:h-[432px] transition-all duration-500 ease-in-out motion-reduce:transition-none"
      style={{transform:`translateX(${pos*45}%) scale(${center?1:adjacent?.85:.7}) rotateY(${pos*-10}deg)`,zIndex:center?10:adjacent?5:1,opacity:center?1:adjacent?.4:0,filter:center?'blur(0px)':'blur(4px)',visibility:Math.abs(pos)>1?'hidden':'visible'}}>
      <img src={image.src} alt={image.alt} width={800} height={1200} loading={Math.abs(pos)>1?'lazy':'eager'} decoding="async" className="object-cover w-full h-full rounded-3xl border-2 border-foreground/10 shadow-2xl"/>
     </div>;
    })}
    </div>
    <Button variant="outline" size="icon" aria-label="Foto anterior" className="absolute left-0 sm:left-8 top-1/2 -translate-y-1/2 rounded-full z-20 bg-background/90 backdrop-blur-sm" onClick={()=>navigate(-1)}><ChevronLeft className="h-5 w-5"/></Button>
    <Button variant="outline" size="icon" aria-label="Próxima foto" className="absolute right-0 sm:right-8 top-1/2 -translate-y-1/2 rounded-full z-20 bg-background/90 backdrop-blur-sm" onClick={()=>navigate(1)}><ChevronRight className="h-5 w-5"/></Button>
   </div>
   <p className="feature-caption text-sm text-foreground" aria-live={paused||focused?'polite':'off'} aria-atomic="true">{images[currentIndex]?.title} <span className="block mt-2">{currentIndex+1} de {images.length}</span></p>
   <Button variant="outline" onClick={()=>setPaused(p=>!p)} disabled={reduced} aria-label={paused||reduced?'Reproduzir carrossel':'Pausar carrossel'}>{paused||reduced?<Play className="mr-2 h-4 w-4"/>:<Pause className="mr-2 h-4 w-4"/>}{reduced?'Movimento reduzido':paused?'Reproduzir':'Pausar'}</Button>
  </div>
 </div>;
});
HeroSection.displayName='HeroSection';
