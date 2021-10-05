import "./css/AudienceMenu.css";
import React,{ useState } from "react";
import { useParams } from "react-router-dom";
import VideoBox from "../video/VideoBox";
import QuestionBoxAudience from "../questions/QuestionBoxAudience";
import VideoAPI from "../api/VideoAPI";

//The main menu after it is determined the user is here to watch a presentation
function AudienceMenu() {
    const { presID } = useParams();
    const [questions,setQuestions] = useState({});

    //state for questions gets split into the two children components
    //this function helps ensure api consistency though
    async function fetchQuestions(){
        let myQuestions = await VideoAPI.fetchQuestions(presID);
        if(myQuestions !== questions){
            setQuestions(myQuestions);
        }
        setTimeout(()=>{
            fetchQuestions();
        },10000)
    }

    return (
        <div className="AudienceMenu">
            <div className="id-title"> Presentation: <span>{presID}</span> </div>
            <VideoBox user="audience" presID={presID}/>
            <QuestionBoxAudience questions={questions} setQuestions={setQuestions} fetchQuestions={fetchQuestions} presID={presID}/>
        </div>
    );
}

export default AudienceMenu;