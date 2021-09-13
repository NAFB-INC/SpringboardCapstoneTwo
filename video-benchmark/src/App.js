import './App.css';
import React, { useState }  from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes/Navigation";
import Routes from "./routes/Routes";
import UserContext from "./hooks/UserContext";

function App() {
    /*
    Stages:
    1 = User unknown
    2 = User known
    3 = During presentation
    4 = After presentation
    */
    const [stage,setStage] = useState(1);
    const [pvA,setPvA] = useState(null);
    
    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{ pvA, setPvA, stage, setStage}}>
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
