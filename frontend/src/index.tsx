import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, RouteObject} from 'react-router-dom';


import App from './ui/partials/App';
import Form from './ui/partials/Form';
import Chat from './ui/partials/Chat';

const routes:RouteObject[] = [
  {
      path: "/",
      element: <App/>,
      children: [
        {
          path: '/form',
          element: <Form/>
        },
        {
          path: '/chat',
          element: <Chat/>,
          
        }
      ]
  },
]

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();