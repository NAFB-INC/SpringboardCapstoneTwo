import "./css/CodeForm.css";
import React,{useContext,useState} from "react";
import useFields from "../hooks/useFields";
import UserContext from "../hooks/UserContext";
import VideoAPI from "../api/VideoAPI";

//form the audience uses to join a presentation
function AudienceCodeForm({ setCode, presenter }) {
    const { setStage } = useContext(UserContext);
    const [errors,setErrors] = useState([]);
    const [formData, handleChange, resetForm] = useFields({
        audience_code: '',
        presenter_pass: ''
    })


    const handleSubmit = e => {
        e.preventDefault();

        //checks if input code is valid
        //adds password too or undefined, based on user
        async function checkCode(){
            return (await VideoAPI.findIfValidCode(formData.audience_code,formData.presenter_pass));
        }

        let valid;
        checkCode().then((tOrF)=>{
            valid=tOrF;

            //sets code and moves to next stage if it is a valid code
            if(presenter){
                if(valid){
                    setCode(formData.audience_code);
                    setStage(3);
                }else{
                    setErrors(["Code not found!"])
                }
            }else {
                if(valid){
                    setCode(formData.audience_code);
                    setStage(3);
                }else{
                    setErrors(["Code not found!"])
                }
            }
        });

        //resets form and shows errors if code is not valid
        //well actually it resets either way, but user doesn't see it if stage changes
        resetForm();
    }

    //presenter gets a password form data
    if(presenter){
        return (
            <div className="AudienceCodeForm">
                <div className="form-text">Have a presentation code and password? Please enter it here!</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-box">
                        <label htmlFor="audience_code">Code: </label>
                        <input autoComplete="audience-code" name="audience_code" type="text" placeholder="abc123" value={formData.audience_code} onChange={handleChange}></input>
                    </div>
                    <div className="form-box">
                        <label htmlFor="presenter_pass">Password: </label>
                        <input autoComplete="presenter-password" name="presenter_pass" type="password" placeholder="xyzpdq" value={formData.presenter_pass} onChange={handleChange}></input>
                    </div>
                    <div>
                        {errors.map((e)=>(
                            <li className="error" key={`error${e}`}>{e}</li>
                        ))}
                    </div>
                    <button className="submit-btn">Submit</button>
                </form>
            </div>
        );
    }else{
        return (
            <div className="AudienceCodeForm">
                <div className="form-text">Have a presentation code? Please enter it here!</div>
                <form onSubmit={handleSubmit}>
                    <div className="form-box">
                        <label htmlFor="audience_code">Code: </label>
                        <input name="audience_code" type="text" placeholder="abc123" value={formData.audience_code} onChange={handleChange}></input>
                    </div>
                    <div>
                        {errors.map((e)=>(
                            <li className="error" key={`error${e}`}>{e}</li>
                        ))}
                    </div>
                    <button className="submit-btn">Submit</button>
                </form>
            </div>
        );
    }
}

export default AudienceCodeForm;