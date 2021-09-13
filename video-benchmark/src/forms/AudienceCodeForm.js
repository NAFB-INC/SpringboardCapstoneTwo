import React,{useContext,useEffect,useState,useRef} from "react";
import useFields from "../hooks/useFields";
import VideoAPI from "../api/VideoAPI";
import UserContext from "../hooks/UserContext";


function AudienceCodeForm({ setCode }) {
    const { setStage } = useContext(UserContext);
    const [errors,setErrors] = useState(null);
    const API = useRef();

    useEffect(()=>{
        API.current = new VideoAPI();
    },[]);

    const [formData, handleChange, resetForm] = useFields({
        audience_code: ''
    })
    const handleSubmit = e => {
        e.preventDefault();
        if(API.current.findIfValidCode(formData.audience_code)){
            setCode(formData.audience_code);
            setStage(3);
        }else{
            setErrors("Code not found!")
        }
        resetForm();
    }


    return (
        <div className="AudienceCodeForm">
            Have an audience code?
            Please enter it here!
            <form onSubmit={handleSubmit}>
                <label htmlFor="audience_code">Code: </label>
                <input name="audience_code" type="text" placeholder="abc123" value={formData.audience_code} onChange={handleChange}></input>
                <div>{errors}</div>
                <button>Submit</button>
            </form>
        </div>
    );
}

export default AudienceCodeForm;