import React,{ useState } from "react";
import { useParams } from "react-router-dom";
import VideoBox from "../video/VideoBox";
import QuestionBoxAudience from "../questions/QuestionBoxAudience";
import VideoAPI from "../api/VideoAPI";


function AudienceMenu() {
    const { presID } = useParams();
    const [questions,setQuestions] = useState({});

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
            Audience Menu
            <div> Presentation: {presID} </div>
            <VideoBox user="audience" presID={presID}/>
            <QuestionBoxAudience questions={questions} setQuestions={setQuestions} fetchQuestions={fetchQuestions} presID={presID}/>
        </div>
    );
}

export default AudienceMenu;