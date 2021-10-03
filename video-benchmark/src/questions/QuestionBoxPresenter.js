import React, { useState } from "react";
import Question from "../questions/Question";
import VideoAPI from "../api/VideoAPI";


function QuestionBoxPresenter({presID,questions,time}) {

    const [num,setNum] = useState(0);
    const [currentQuestion,setCurrentQuestion] = useState("");

    function setQuestion(){
        if(questions && questions[`${num+1}`])
        {
            VideoAPI.addBenchmark(presID,num+1,time);
            setCurrentQuestion(questions[`${num+1}`]);
            setNum(num+1);
        }
    }
    function skipQuestion(){
        if(questions && questions[`${num+1}`])
        {
            setCurrentQuestion(questions[`${num+1}`]);
            setNum(num+1);
        }
    }

    console.log("questions: ",questions);


    return (
        <div className="QuestionBoxPresenter">
            Question Box - Presenter
    <div><span>Showing question: {num}</span> 
        {questions?
            <span> Remaining: {Object.keys(questions).length}</span>:
            null
        }
    </div>
            {currentQuestion?<Question question={currentQuestion}/>:null}
            {num < Object.keys(questions).length?
            <div>
                <button onClick={setQuestion}>Next Question!</button>
                <button onClick={skipQuestion}>Skip!</button>
            </div>:
            <div>No more questions... for now.</div>}
        </div>
    );
}

export default QuestionBoxPresenter;