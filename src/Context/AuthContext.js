import { createContext, useState } from "react";

export let authContext = createContext()

 export function AuthProvider({children}){

  const [token, setToken] = useState(localStorage.getItem("token"))
 
  
    return<authContext.Provider value={{token,setToken}}>
     {children}
    </authContext.Provider>
 }