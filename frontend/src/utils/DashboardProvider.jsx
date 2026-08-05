import { createContext } from "react";
import { useEffect, useState } from "react";
import { customFetch } from "./customFetch";

//creating a context
export const DashboardContext = createContext();

//exporting a provider
export const DashboardProvider = ({ children }) => {
  //jsx variable
  const [totalAnalysis, setTotalAnalysis] = useState(0);
  const [credits, setCredits] = useState(0);
  const [lastPurchaseHistory, setLastPurchaseHistory] = useState();
  const [name, setName] = useState()

  //function to talk to the server
  const talkToServer = async () => {

    // getting the data for dashboard
    const serverObject = await customFetch("dashboard");
    
    //checking whether authentication is expired
    if (serverObject.statusCode === 401) {
      //talking to the server to fresh token
      const serverReply = await customFetch("refresh");

      if (serverReply.success) {
        //talking to the server to get the data from dashboard
        const talkingBackToServer = await customFetch("dashboard");

        if (talkingBackToServer.success) {
          setName(talkingBackToServer.data.name);
          setCredits(talkingBackToServer.data.credits);
          setTotalAnalysis(talkingBackToServer.data.numOfAnalysis);
          setLastPurchaseHistory(talkingBackToServer.data.lastPurHistory);
        }
      }
    } else if (serverObject.success) {
      setName(serverObject.data.name);
      setCredits(serverObject.data.credits);
      setTotalAnalysis(serverObject.data.numOfAnalysis);
      setLastPurchaseHistory(serverObject.data.lastPurHistory);
    }
  };

  useEffect(() => {
    talkToServer();
  }, []);

  return (
    <DashboardContext
      value={{
        totalAnalysis,
        setTotalAnalysis,
        credits,
        setCredits,
        lastPurchaseHistory,
        name,
      }}
    >
      {children}
    </DashboardContext>
  );
};
