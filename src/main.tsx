import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Query from "./query";
import Chat from "./chat";
import Home from './home/Home.tsx';
import ToastContainer from './utils/toast.tsx';
import Test from "./test";
import LRScaffold from './Login_Register/index.tsx';
import Review from './review/index.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
        children: []
      },
      {
        path: 'Login',
        element: <LRScaffold />,
        children: []
      },
      {
        path: 'Review',
        element: <Review />,
        children: []
      },
      {
        path: 'query',
        element: <Query />,
        children: []
      },
      {
        path: '/chat',
        element: <Chat />
      },
      {
        path: 'test',
        element: <Test />
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <ToastContainer />
  </StrictMode>
)
