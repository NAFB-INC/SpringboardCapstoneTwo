import React, { useState } from "react";
import Question from "../questions/Question";


function QuestionBoxPresenter({questions}) {

    const [num,setNum] = useState(0);
    const [currentQuestion,setCurrentQuestion] = useState("");

    function setQuestion(){
        if(questions && questions[`${num+1}`])
        {
            setCurrentQuestion(questions[`${num+1}`]);
            setNum(num+1);
        }
    }

    return (
        <div className="QuestionBoxPresenter">
            Question Box - Presenter
            <div>Showing question: {num}</div>
            {currentQuestion?<Question question={currentQuestion}/>:null}
            <button onClick={setQuestion}>Next Question!</button>
        </div>
    );
}

export default QuestionBoxPresenter;