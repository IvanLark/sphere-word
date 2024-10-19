import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import './MainView.css'
import { useEffect, useRef } from 'react';
// import { useGSAP } from '@gsap/react';
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
    //   // !transform: '',无效
    // }
    // !啊这个去掉也行
  }, [location])

  const navigate = useNavigate()
  const testRoute: string[] = ['query', 'chat'];
  return (
    <div className="w-screen h-screen flex flex-col" ref={routerRef}>
      {/* <div className="w-screen flex-1"> */}
      <Outlet />
      {/* </div> */}
      {/* //td to implement */}
      {/* <div className="w-screen h-[100px] fixed bottom-0 bg-white flex items-center justify-center gap-10 shrink-0">
        {testRoute.map((route, index) =>
          <button className="btn-scale btn-grey px-4 py-2 text-5xl" onClick={() => navigate(`/${route}`)} key={index}>{route}</button>
        )}
      </div> */}
    </div>
  )
}

export default App
