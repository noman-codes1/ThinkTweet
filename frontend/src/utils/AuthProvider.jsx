import { createContext } from "react";
import { useState, useEffect } from "react";
import { customFetch } from "./customFetch";

//exporting the created context
export const AuthContext = createContext(false);

// #tip : Add a loader, to avoid showing the resource for split second

//function to talk to the server and get the data
export const AuthProvider = ({ children }) => {
  //setting the state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState("")

  //writing the function to talk to the server and get the authentication
  const getAuthenticationCheck = async () => {
      const serverObject = await customFetch("authenticated");
      console.log(serverObject)

      if (serverObject.statusCode === 401) {
        const refreshSeverObject = await customFetch("refresh")

        if (refreshSeverObject.success){
          setIsAuthenticated(true)
        }
      } else if (serverObject.success) {
        setIsAuthenticated(true)
        setUserName(serverObject.message.name)
      }
  }

  //talking to the server
  useEffect(() => {
    getAuthenticationCheck();
  }, []);

  return (
    //returning the context
    <AuthContext value={{ isAuthenticated, setIsAuthenticated, userName, setUserName }}>
      {children}
    </AuthContext>
  );
};
