import React, { useState } from "react";
import useFields from "../hooks/useFields";

function VideoSelectionForm() {
    const [errorsCode,setErrorsCode] = useState([]);
    const [errorsSearch,setErrorsSearch] = useState([]);
    const [formData, handleChange, resetForm] = useFields({
        audience_code: '',
        key_phrase: ''
    })

    const handleSubmitCode = e => {
        e.preventDefault();
        resetForm();
    }
    
    const handleSubmitSearch = e => {
        e.preventDefault();
        resetForm();
    }

    return (
        <div className="VideoSelectionForm">
            <div>Have a presentation code? Find what you are looking for right away with that!</div>
            <form onSubmit={handleSubmitCode}>
                <label htmlFor="audience_code">Code: </label>
                <input name="audience_code" type="text" placeholder="abc123" value={formData.audience_code} onChange={handleChange}></input>
                <div>
                    {errorsCode.map((e)=>(
                        <li className="error" key={`error${e}`}>{e}</li>
                    ))}
                </div>
                <button>Submit</button>
            </form>
            <br/>
            <div>OR maybe you are looking for a person or topic?</div>
            <form onSubmit={handleSubmitSearch}>
                <label htmlFor="key_phrase">Phrase: </label>
                <input name="key_phrase" type="text" placeholder="presentations" value={formData.key_phrase} onChange={handleChange}></input>
                <div>
                    {errorsSearch.map((e)=>(
                        <li className="error" key={`error${e}`}>{e}</li>
                    ))}
                </div>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default VideoSelectionForm;