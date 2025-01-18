import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, RouteObject} from 'react-router-dom';


import App from './ui/partials/App';
import Form from './ui/partials/Form';
import Chat from './ui/partials/Chat';
import InsertImage from './ui/partials/InsertImage';

const routes:RouteObject[] = [
  {
      path: "/",
      element: <App/>,
      children: [
        { 
          index: true, // define form como padrao
          element: <Form/>
        },
        {
          path: '/form',
          element: <Form/>
        },
        {
          path: '/insert-image',
          element: <InsertImage/>
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