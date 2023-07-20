import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import HomePage from './pages/HomePage';
import CreateUser from './pages/CreateUser';
import UpdateUser from './components/UpdateUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/createUser',
        element: <CreateUser />
      },
      {
        path: "/updateUser",
        element: <UpdateUser />
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);


