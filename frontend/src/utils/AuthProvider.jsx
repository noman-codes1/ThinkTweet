import { createContext } from "react";
import { useState, useEffect } from "react";

//exporting the created context
export const AuthContext = createContext(false);

//function to talk to the server and get the data
export const AuthProvider = ({ children }) => {
  //setting the state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  //talking to the server
  useEffect(() => {
    async function serverTalk() {
      try {
        const response = await fetch("", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (success) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    }
  }, []);

  return (
    //returning the context
    <AuthContext value={{isAuthenticated, setIsAuthenticated}}>{children}</AuthContext>
  );
};