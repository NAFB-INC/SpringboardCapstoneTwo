import React,{ useContext } from "react";
import { useParams,Redirect } from "react-router-dom";
import VideoBox from "../video/VideoBox";
import QuestionBoxPresenter from "../questions/QuestionBoxPresenter";
import UserContext from "../hooks/UserContext";

function PresenterMenu() {
    const { presID } = useParams();
    const { questions,setQuestions } = useContext(UserContext);

    if(sessionStorage.getItem('code')===presID && sessionStorage['secure_hash']==='not_secure'){
        return (
            <div className="PresenterMenu">
                PresenterMenu
                <div> Presentation: {presID} </div>
                <VideoBox user="presenter"/>
                <QuestionBoxPresenter questions={questions} setQuestions={setQuestions}/>
            </div>
        );
    }else{
        return(
            <Redirect to="/presenter" />
        );
    }
}

export default PresenterMenu;