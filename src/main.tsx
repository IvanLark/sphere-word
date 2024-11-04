import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/app.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Query from "./pages/query/query.page.tsx";
import Chat from "./pages/chat/chat.page.tsx";
import HomePage from './pages/home/home.page.tsx';
import ToastContainer from './common/utils/toast.util.tsx';
import Auth from './pages/auth/auth.page.tsx';
import Review from './pages/review/review.page.tsx';

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        path: 'review',
        element: <Review />,
      },
      {
        path: 'query',
        element: <Query />,
      },
      {
        path: '/chat',
        element: <Chat />
      }
    ]
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <ToastContainer />
  </StrictMode>
)
