import React, { useState } from "react";
import VideoAPI from "../api/VideoAPI";
import useFields from "../hooks/useFields";

//form used for submitting new questions
function QuestionForm({presID,questions,setQuestions,setRevealQBox,setFeedback,fetchQuestions}) {
    const [errors,setErrors] = useState([]);
    const [formData, handleChange, resetForm] = useFields({
        question: ''
    })

    //will filter out empties and exact repeats
    const handleSubmit = e => {
        e.preventDefault();
        if(!formData.question){
            setErrors(["Text is required for a question!"])
        }
        if(Object.values(questions)){
            for(let val of Object.values(questions)){
                if(formData.question === val){
                    setFeedback("Your question has already been asked, and has been answered, or will be answered soon!");
                    setRevealQBox(false);
                }
            }
        }
        //if not empty, submits to the api along with the presentation code of whatever you are currently watching
        if(errors.length < 1){
            VideoAPI.addQuestion(presID,formData.question);
            fetchQuestions();
            setFeedback("Your question has been added to the que!");
            setRevealQBox(false);
        }
        resetForm();
    }

    return (
        <div className="QuestionForm">
            <form onSubmit={handleSubmit}>
                    <label htmlFor="question">Question: </label>
                    <input name="question" type="text" placeholder="What did you mean by ___?" value={formData.question} onChange={handleChange}></input>
                    <div>
                        {errors.map((e)=>(
                            <li className="error" key={`error${e}`}>{e}</li>
                        ))}
                    </div>
                    <button id="submit-q" className="present-choice-btn-sm">Submit</button>
            </form>
        </div>
    );
}

export default QuestionForm;