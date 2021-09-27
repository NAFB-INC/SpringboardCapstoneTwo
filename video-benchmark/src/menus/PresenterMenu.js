import React,{ useContext } from "react";
import { useParams } from "react-router-dom";
import VideoBox from "../video/VideoBox";
import QuestionBoxPresenter from "../questions/QuestionBoxPresenter";
import UserContext from "../hooks/UserContext";

function PresenterMenu() {
    const { presID } = useParams();
    const { questions,setQuestions } = useContext(UserContext);


    return (
        <div className="PresenterMenu">
            PresenterMenu
            <div> Presentation: {presID} </div>
            <VideoBox/>
            <QuestionBoxPresenter questions={questions} setQuestions={setQuestions}/>
        </div>
    );
}

export default PresenterMenu;