import { Outlet, useNavigate } from 'react-router-dom'
import '../assets/css/style.css'
import { Suspense, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { toast } from "../common/utils/toast.util.tsx";
import ErrorBoundary from '../common/components/ErrorBoundary/ErrorBoundary';
import {useRequest} from "alova/client";
import {checkLogin} from "../api/methods/auth.methods.ts";

function App() {

  const routerRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // 登录校验
  useRequest(checkLogin())
    .onError(() => {
      toast.error('未登录，请先登录');
      navigate('/auth');
    });

  useEffect(() => {
    // 页面切换动画
    gsap.fromTo(routerRef.current, { opacity: 0, x: '-50vw' }, {
      opacity: 1, x: 0, duration: 0.3,
      onComplete: () => { (routerRef.current! as HTMLDivElement).style.transform = '' }
    });
  })

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
