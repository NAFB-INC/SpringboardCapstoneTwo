import "./css/PresenterMenu.css";
import React,{ useEffect, useState } from "react";
import { useParams,Redirect } from "react-router-dom";
import VideoBox from "../video/VideoBox";
import QuestionBoxPresenter from "../questions/QuestionBoxPresenter";
import VideoAPI from "../api/VideoAPI";
import Video from "../video/Video";

//The main menu after it is determined the user is here to present
function PresenterMenu() {
    const { presID } = useParams();
    const [questions,setQuestions] = useState({});
    const [time,setTime] = useState(0);
    const [returnTexts,setReturnText] = useState(null);

    //gets all the questions, and sets a timer to get any new ones every so often
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

    useEffect(()=>{
        console.log("HELLO???");
        async function getVideo(){
            await VideoAPI.resetDataLibrary();
            let video = await VideoAPI.fetchVideo(presID);
            console.log(video);
            let returnText = (<Redirect to="/presenter" />);
            if(!video){
                setReturnText(returnText);
            }
            else if(video.past_video){
                setReturnText(returnText);
            }
        }
        getVideo();
    },[])

    //ensures user is actually presenter, and isn't here by link.
    //if they have not been cleared by codeform yet, redirects them there.
    if(returnTexts){
        return returnTexts;
    }
    else if(sessionStorage.getItem('code')===presID && sessionStorage['secure_hash']==='not_secure'){
        return (
            <div className="PresenterMenu">
                <div className="id-title"> Presentation: <span>{presID}</span> </div>
                <VideoBox user="presenter" presID={presID} setTime={setTime}/>
                <QuestionBoxPresenter presID={presID} questions={questions} time={time}/>
            </div>
        );
    }else{
        return(
            <Redirect to="/presenter" />
        );
    }
}

export default PresenterMenu;