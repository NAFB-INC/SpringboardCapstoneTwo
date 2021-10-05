import "./css/QuestionBox.css";
import React, { useEffect, useState } from "react";
import QuestionForm from "../forms/QuestionForm";

//the component for questions on the audience side
function QuestionBoxAudience({questions,setQuestions,fetchQuestions,presID}) {
    const [revealQBox,setRevealQBox] = useState(false);
    const [feedback,setFeedback] = useState("");

    //removes feedback messages after 5 seconds
    useEffect(()=>{
        setTimeout(()=>{
            if(feedback){
                setFeedback("");
            }
        },5000)
    },[feedback,setFeedback]);

    //mainly this holds the create question form, used for submitting new questions
    return (
        <div className="QuestionBoxAudience">
            <div>{feedback}</div>
            {revealQBox?
                <div className="q-bounder">
                    <QuestionForm 
                        questions={questions} 
                        setQuestions={setQuestions} 
                        setRevealQBox={setRevealQBox} 
                        setFeedback={setFeedback} 
                        fetchQuestions={fetchQuestions} 
                        presID={presID}
                    />
                    <button id="nvm-q" className="present-choice-btn-sm" onClick={()=>{setRevealQBox(!revealQBox)}}>Never Mind</button>
                </div>
                :
                <div className="q-bounder">
                    <div>Have a question for the presenter? Ask away!</div>
                    <button id="have-q" className="present-choice-btn-2" onClick={()=>{setRevealQBox(!revealQBox)}}>I have a question!</button>
                </div>
            }
        </div>
    );
}

export default QuestionBoxAudience;