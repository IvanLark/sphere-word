import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Query from "./query";
import QueryData from "./query/data";
import QueryGraph from "./query/graph";
import QueryDataCore from "./query/data/core";
import QueryDataRelation from "./query/data/relation";
import Chat from "./chat";

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: [
      {
        path: 'query',
        element: <Query/>,
        children: [
          {
            path: 'data',
            element: <QueryData/>,
            children: [
              {
                path: 'core',
                element: <QueryDataCore/>
              },
              {
                path: 'relation',
                element: <QueryDataRelation/>
              }
            ]
          },
          {
            path: 'graph',
            element: <QueryGraph/>
          }
        ]
      },
      {
        path: '/chat',
        element: <Chat/>
      }
    ]
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}/>
    </QueryClientProvider>
  </StrictMode>
)
