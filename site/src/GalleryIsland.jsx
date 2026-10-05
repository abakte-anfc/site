import React,{Component,useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {HeroSection} from '@/components/ui/feature-carousel';
class GalleryBoundary extends Component {
 state={failed:false};
 static getDerivedStateFromError(){return {failed:true};}
 componentDidCatch(){queueMicrotask(this.props.onFailure);}
 render(){return this.state.failed?null:this.props.children;}
}
function Gallery({items,onReady}) {
 useEffect(()=>onReady(),[onReady]);
 return <HeroSection title="Registros de palco" subtitle="Gestos, encontros e expressão em cena." images={items}/>;
}
export function mountGallery(element,items,handlers) {
 const root=createRoot(element);
 root.render(<GalleryBoundary onFailure={handlers.failed}><Gallery items={items} onReady={handlers.ready}/></GalleryBoundary>);
 return ()=>root.unmount();
}
