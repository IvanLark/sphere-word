import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import '../assets/css/main-view.css'
import { Suspense, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { toast } from "../common/utils/toast.util.tsx";
import ErrorBoundary from '../common/components/ErrorBoundary/ErrorBoundary';

function App() {

  const routerRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // 页面切换动画
    gsap.fromTo(routerRef.current, { opacity: 0, x: '-50vw' }, {
      opacity: 1, x: 0, duration: 0.3,
      onComplete: () => { (routerRef.current! as HTMLDivElement).style.transform = '' }
    });

    // 判断是否登录
    const tokenCreateTime = localStorage.getItem('tokenCreateTime')
    if (tokenCreateTime === null && location.pathname !== '/auth') {
      toast.error('未登录，请先登录');
      navigate('/auth');
    }
    // token超过30天过期
    if (tokenCreateTime !== null && location.pathname !== '/auth' &&
      Math.abs(new Date().getTime() - Number(tokenCreateTime)) >= (1000 * 60 * 60 * 24 * 30)) {
      toast.error('登录已过期，请重新登录');
      navigate('/auth');
    }
  }, [navigate, location])

  return (
    <div className="w-screen h-screen flex flex-col" ref={routerRef}>
      <ErrorBoundary>
        <Suspense fallback={<div className='w-full h-full flex justify-center items-center text-4xl font-bold' >Loading...</div>}>
          <Outlet />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
