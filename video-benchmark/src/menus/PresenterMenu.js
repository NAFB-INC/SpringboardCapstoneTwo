import React,{ useEffect, useState } from "react";
import { useParams,Redirect } from "react-router-dom";
import VideoBox from "../video/VideoBox";
import QuestionBoxPresenter from "../questions/QuestionBoxPresenter";
import VideoAPI from "../api/VideoAPI";

function PresenterMenu() {
    const { presID } = useParams();
    const [questions,setQuestions] = useState({});

    useEffect(()=>{
        async function fetchQuestions(){
            let myQuestions = await VideoAPI.fetchQuestions(presID);
            if(myQuestions !== questions){
                setQuestions(myQuestions);
            }
            setTimeout(()=>{
                fetchQuestions();
            },10000)
        }
        fetchQuestions();
    },[presID]);

    if(sessionStorage.getItem('code')===presID && sessionStorage['secure_hash']==='not_secure'){
        return (
            <div className="PresenterMenu">
                PresenterMenu
                <div> Presentation: {presID} </div>
                <VideoBox user="presenter" presID={presID}/>
                <QuestionBoxPresenter questions={questions}/>
            </div>
        );
    }else{
        return(
            <Redirect to="/presenter" />
        );
    }
}

export default PresenterMenu;