import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider, RouteObject} from 'react-router-dom';


import App from './ui/partials/App';
import Form from './ui/partials/Form';
import Chat from './ui/partials/Chat';
import InsertImage from './ui/partials/InsertImage';
import TestText from './ui/partials/TestText';
import EditUser from './ui/partials/EditUser';
import LogOut from './ui/partials/LogOut';

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
          path: "/test",
          element: <TestText/>
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
          
        }, 
        {
          path: "/edit-user",
          element: <EditUser/>
        },
        {
          path: '/log-out',
          element: <LogOut/>
        }
      ]
  },
]

const router = createBrowserRouter(routes);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  /* remover react strict mode. Permitir somente para desenvolvimento */
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();