import React,{ useContext } from "react";
import { useParams } from "react-router-dom";
import VideoBox from "../video/VideoBox";
import QuestionBoxAudience from "../questions/QuestionBoxAudience";
import UserContext from "../hooks/UserContext";


function AudienceMenu() {
    const { presID } = useParams();
    const { questions,setQuestions } = useContext(UserContext);

    return (
        <div className="AudienceMenu">
            Audience Menu
            <div> Presentation: {presID} </div>
            <VideoBox user="audience" presID={presID}/>
            <QuestionBoxAudience questions={questions} setQuestions={setQuestions}/>
        </div>
    );
}

export default AudienceMenu;