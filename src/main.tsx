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
import ErrorPage from './common/components/ErrorBoundary/ErrorPage.tsx';
import Article from './pages/article/article.tsx';
import Read from "./pages/read/read.tsx";
import ReadMain from "./pages/read/pages/read-main.tsx";
import ReadInput from "./pages/read/pages/read-input.tsx";
import ReadKeep from "./pages/read/pages/read-keep.tsx";
import ReadBooks from "./pages/read/pages/read-books.tsx";
import ReadBook from "./pages/read/pages/read-book.tsx";

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
        path: '/article',
        element: <Article />
      },
      {
        path: '/read',
        element: <Read />,
        children: [
          {
            path: '/read',
            element: <ReadMain />
          },
          {
            path: '/read/input',
            element: <ReadInput />
          },
          {
            path: '/read/keep',
            element: <ReadKeep />
          },
          {
            path: '/read/books',
            element: <ReadBooks />
          },
          {
            path: '/read/book',
            element: <ReadBook />
          }
        ]
      }
    ],
    errorElement: <ErrorPage />
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
