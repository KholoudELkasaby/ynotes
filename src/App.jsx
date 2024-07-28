import React from "react";
import { RouterProvider , createHashRouter } from "react-router-dom" ;
import Home from './Components/Home/Home';
import Layout from './Components/Layout/Layout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Protected from './Components/Protected/Protected';
import { AuthProvider } from "./Context/AuthContext";
import { NoteProvider } from "./Context/NoteContext";










function App() {
   const routers = createHashRouter([
    {path:"/login",element:<Login/> },
    {path:"/register",element:<Register/> },
    {
        path:"/",
        element: <Layout/>,
        children:[
            {
                path:"/",
                element:(
                    <Protected>
                      {" "}
                       <Home/>{" "}
                    </Protected>
                ),
            },
        ],
    },
   ]);

  return (
    <>
       <AuthProvider>
        <NoteProvider>
          <RouterProvider router={routers} />
        </NoteProvider>
      </AuthProvider>
    </>
  );
}

export default App;
