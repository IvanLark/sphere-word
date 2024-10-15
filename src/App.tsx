import { Outlet, useNavigate } from 'react-router-dom'
import './MainView.css'
function App() {

  const navigate = useNavigate()
  const testRoute: string[] = ['query', 'chat'];
  // 在下面做导航栏？像手机app一样
  return (
    <div className="w-screen h-screen flex flex-col">
      {/* <div className="w-screen flex-1"> */}
      <Outlet />
      {/* </div> */}
      {/* //td to implement */}
      <div className="w-screen h-[200px] fixed bottom-0 bg-white flex items-center justify-center gap-10 shrink-0">
        {testRoute.map((route, index) =>
          <button className="btn-scale btn-grey px-4 py-2 text-5xl" onClick={() => navigate(`/${route}`)} key={index}>{route}</button>
        )}
      </div>
    </div>
  )
}

export default App
