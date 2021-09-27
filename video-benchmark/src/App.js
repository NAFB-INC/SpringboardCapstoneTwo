import './App.css';
import React, { useState,useEffect,useRef }  from "react";
import { BrowserRouter } from "react-router-dom";
import Navigation from "./routes/Navigation";
import Routes from "./routes/Routes";
import UserContext from "./hooks/UserContext";
import VideoAPI from "./api/VideoAPI";

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
    const [questions,setQuestions] = useState([]);
    // const API = useRef();

    // useEffect(()=>{
    //     API.current = new VideoAPI();
    // },[]);
    
    return (
        <div className="App">
            <BrowserRouter>
                <UserContext.Provider value={{ pvA, setPvA, stage, setStage, questions, setQuestions}}>
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
