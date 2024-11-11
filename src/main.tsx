import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './pages/app.tsx'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Query from "./pages/query/query.tsx";
import Chat from "./pages/chat/chat.tsx";
import Home from './pages/home/home.tsx';
import ToastContainer from './common/utils/toast.util.tsx';
import Auth from './pages/auth/auth.tsx';
import Review from './pages/review/review.tsx';
// import Test from "./pages/test/test.tsx";
import ErrorTest from './common/components/ErrorBoundary/ErrorTest.tsx';
import ErrorPage from './common/components/ErrorBoundary/ErrorPage.tsx';
// import Test from "./pages/test/test.tsx";


const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
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
      },
      {
        path: 'error-test',
        element: <ErrorTest />
      },

    ],
    errorElement: <ErrorPage />
  },
  {
    path: '/auth',
    element: <Auth />
  },
  // {
  //   path: '/test',
  //   element: <Test />
  // }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    <ToastContainer />
  </StrictMode>
)
