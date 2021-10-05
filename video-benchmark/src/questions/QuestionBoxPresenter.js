import "./css/QuestionBox.css";
import React, { useState } from "react";
import Question from "../questions/Question";
import VideoAPI from "../api/VideoAPI";

//the component for questions on the presenter side
function QuestionBoxPresenter({presID,questions,time}) {

    const [num,setNum] = useState(0);
    const [currentQuestion,setCurrentQuestion] = useState(null);

    //function for displaying the next question
    function setQuestion(){
        if(questions && questions[`${num+1}`])
        {
            VideoAPI.addBenchmark(presID,num+1,time);
            setCurrentQuestion(questions[`${num+1}`]);
            setNum(num+1);
        }
    }

    //function to skip a question for whatever reason the user may have
    function skipQuestion(){
        if(questions && questions[`${num+1}`])
        {
            setCurrentQuestion(questions[`${num+1}`]);
            setNum(num+1);
        }
    }

    //mainly displays all questions currently asked, as well as a little explanation about what happens in the box 
    //because it is not terribly clear if the box is empty what it is for at first.
    return (
        <div className="QuestionBoxPresenter">
            {!currentQuestion?
            <div>
                <div className="q-box-explain-presenter">When you are ready to answer questions from the audience, they will show up here.</div>
                <div className="q-box-explain-presenter">You can answer them at any time, or not at all!</div>
            </div>:
            <div className="q-box-explain-presenter">By "skipping" the question, it does not create a benchmark in the playback video.</div>
            }
            <div id="current-question">{currentQuestion?<Question question={currentQuestion}/>:null}</div>
            <div id="question-counter"><span>Answered questions: {num}</span> 
            {questions?
                <span> Remaining: {Object.keys(questions).length-num}</span>:
                null
            }
            </div>
            {num < Object.keys(questions).length?
            <div>
                <button id="next-q" className="present-choice-btn-2" onClick={setQuestion}>Next Question!</button>
            </div>:null}
            {num < Object.keys(questions).length+1?
            <div>
                <button id="skip-q" className="present-choice-btn-2" onClick={skipQuestion}>Skip!</button>
            </div>:null}
        </div>
    );
}

export default QuestionBoxPresenter;