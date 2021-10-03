import React, { useEffect, useState } from "react";
import QuestionForm from "../forms/QuestionForm";

function QuestionBoxAudience({questions,setQuestions,fetchQuestions,presID}) {
    const [revealQBox,setRevealQBox] = useState(false);
    const [feedback,setFeedback] = useState("");

    useEffect(()=>{
        setTimeout(()=>{
            if(feedback){
                setFeedback("");
            }
        },5000)
    },[feedback,setFeedback]);

    return (
        <div className="QuestionBoxAudience">
            QuestionBox - Audience
            <div>{feedback}</div>
            {revealQBox?
                <div>
                    <QuestionForm 
                        questions={questions} 
                        setQuestions={setQuestions} 
                        setRevealQBox={setRevealQBox} 
                        setFeedback={setFeedback} 
                        fetchQuestions={fetchQuestions} 
                        presID={presID}
                    />
                    <button onClick={()=>{setRevealQBox(!revealQBox)}}>Never Mind</button>
                </div>
                :
                <div>
                    <div>Have a question for the presenter? Ask away!</div>
                    <button onClick={()=>{setRevealQBox(!revealQBox)}}>I have a question!</button>
                </div>
            }
        </div>
    );
}

export default QuestionBoxAudience;