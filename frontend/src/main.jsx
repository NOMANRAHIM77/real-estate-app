import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './pages/Home';
import Login from './authentication/Login';
import Signup from './authentication/Signup';
import Profile from './pages/Profile.jsx';
import UpdateProfile from './pages/UpdateProfile.jsx';
import CreateNewPost from './pages/CreateNewPost.jsx';
import ListPage from './pages/ListPage.jsx'
import Layout from './Layout/Layout';
import { AuthContextProvider } from './context/AuthContext.jsx'
import { profileLoader } from './lib/loader.js'; // You must create this file/function
import { SocketContextProvider } from './context/SocketContext.jsx';
import PostDetailView from './pages/PostDetailView'
import {singlePageLoader} from './lib/loader'
import {listPageLoader} from './lib/loader.js'
const router = createBrowserRouter([
  {
    path: "/",
    element: (
     
 <AuthContextProvider>
   <SocketContextProvider>
        <Layout />
    </SocketContextProvider>
   </AuthContextProvider>
     
     
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/profile",
        element: <Profile />,
        loader: profileLoader, // This is mandatory for useLoaderData to work
      },
      {
        path: "/updateprofile",
        element: <UpdateProfile />,
        loader: profileLoader, // This is mandatory for useLoaderData to work
      },
          {
        path: "/newpost",
        element: <CreateNewPost />,
        loader: profileLoader, // This is mandatory for useLoaderData to work
      },
      {
        path: "/list",
        element: <ListPage />,
        loader: listPageLoader,
      },
    {path: "/:id", // 🟢 This catches the click from <Link to={`/${item.id}`}>
        element: <PostDetailView />, // 🟢 Ensure this is NOT "SinglePage"
        loader: singlePageLoader, // 🟢 Make sure your single post loader is attached here
      }
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)