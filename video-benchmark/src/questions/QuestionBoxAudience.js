import React, { useState } from "react";
import QuestionForm from "../forms/QuestionForm";

function QuestionBoxAudience({questions,setQuestions}) {
    const [revealQBox,setRevealQBox] = useState(false);

    return (
        <div className="QuestionBoxAudience">
            QuestionBox - Audience
            {revealQBox?
                <div>
                    <QuestionForm question={questions} setQuestions={setQuestions} />
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