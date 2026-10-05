import React,{useEffect,useRef,useState} from 'react';
import {createRoot} from 'react-dom/client';
import LogoLoop from './components/LogoLoop';
const logos=['Dança','Teatro','Música'].map(title=>({node:<span>{title}<span className="services-divider" aria-hidden="true">/</span></span>,title}));
function Services(){
 const host=useRef(null);
 const [reduced,setReduced]=useState(false),[visible,setVisible]=useState(false),[tabVisible,setTabVisible]=useState(!document.hidden);
 useEffect(()=>{
  const media=matchMedia('(prefers-reduced-motion: reduce)');
  const update=()=>setReduced(media.matches);update();media.addEventListener('change',update);
  const visibility=()=>setTabVisible(!document.hidden);document.addEventListener('visibilitychange',visibility);
  const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting));observer.observe(host.current);
  return()=>{observer.disconnect();media.removeEventListener('change',update);document.removeEventListener('visibilitychange',visibility);};
 },[]);
 return <div className="services-loop" ref={host}>
 <LogoLoop logos={logos} speed={reduced||!visible||!tabVisible?0:55} logoHeight={48} gap={48} hoverSpeed={0} fadeOut fadeOutColor="#ffffff" ariaLabel="Dança, Teatro e Música"/>
 </div>;
}
export function mountServices(element){const root=createRoot(element);root.render(<Services/>);return()=>root.unmount();}
