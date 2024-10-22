import {Outlet, useLocation} from 'react-router-dom'
import './MainView.css'
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
export let routerRef: React.RefObject<HTMLDivElement>;
function App() {
  routerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  // const gsap = useGSAP();
  useEffect(() => {
    gsap.fromTo(routerRef.current, { opacity: 0, x: '-50vw' }, { opacity: 1, x: 0, duration: 0.3, onComplete: () => { (routerRef.current! as HTMLDivElement).style.transform = '' } });
    // gsap.set(routerRef.current, { transform: '' });
    // location.pathname === '/home' ? '-50vw' :
    // setTimeout(() => {
    //   ;
    // }, 310)
    // return () => {
    //   // gsap.to(routerRef.current, { opacity: 1, duration: 0.3, position: 'block' });
    // }
  }, [location])

  return (
    <div className="w-screen h-screen flex flex-col" ref={routerRef}>
      <Outlet />
    </div>
  )
}

export default App
