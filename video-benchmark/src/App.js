import './App.css';
import React, { useEffect, useState }  from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes/Navigation";
import Routes from "./routes/Routes";
import UserContext from "./hooks/UserContext";
import VideoAPI from "./api/VideoAPI";

//Main Application hub, acts as control mind.
function App() {
    /*
    Stages:
    1 = User unknown
    2 = User known
    3 = During presentation
    4 = After presentation
    */

    //data for app-wide context
    const [stage,setStage] = useState(0);
    const [pvA,setPvA] = useState(null);
    const [baseURL] = useState("http://localhost:3000");

    //fill local object 'database' for client
    useEffect(()=>{
        VideoAPI.resetDataLibrary();
    },[])


    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{ pvA, setPvA, stage, setStage, baseURL}}>
                    <div>
                        <Navigation />
                        <Routes />
                    </div>
                </UserContext.Provider>
            </BrowserRouter>
        </div>
  );
}

export default App;
