import React,{useContext,useState} from "react";
import useFields from "../hooks/useFields";
import UserContext from "../hooks/UserContext";
import VideoAPI from "../api/VideoAPI";

function AudienceCodeForm({ setCode, presenter }) {
    const { setStage } = useContext(UserContext);
    const [errors,setErrors] = useState(null);
    const [formData, handleChange, resetForm] = useFields({
        audience_code: '',
        presenter_pass: ''
    })


    const handleSubmit = e => {
        e.preventDefault();

        async function checkCode(){
            return (await VideoAPI.findIfValidCode(formData.audience_code,formData.presenter_pass));
        }

        if(presenter){
            if(checkCode()){
                setCode(formData.audience_code);
                setStage(3);
            }else{
                setErrors(["Code not found!"])
            }
        }else {
            if(checkCode()){
                setCode(formData.audience_code);
                setStage(3);
            }else{
                setErrors(["Code not found!"])
            }
        }
        resetForm();
    }

    if(presenter){
        return (
            <div className="AudienceCodeForm">
                Have a presentation code and password?
                Please enter it here!
                <form onSubmit={handleSubmit}>
                    <label htmlFor="audience_code">Code: </label>
                    <input name="audience_code" type="text" placeholder="abc123" value={formData.audience_code} onChange={handleChange}></input>
                    <label htmlFor="presenter_pass">Password: </label>
                    <input name="presenter_pass" type="password" placeholder="xyzpdq" value={formData.presenter_pass} onChange={handleChange}></input>
                    <div>
                        {errors.map((e)=>(
                            <li>{e}</li>
                        ))}
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        );
    }else{
        return (
            <div className="AudienceCodeForm">
                Have a presentation code?
                Please enter it here!
                <form onSubmit={handleSubmit}>
                    <label htmlFor="audience_code">Code: </label>
                    <input name="audience_code" type="text" placeholder="abc123" value={formData.audience_code} onChange={handleChange}></input>
                    <div>
                        {errors.map((e)=>(
                            <li>{e}</li>
                        ))}
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        );
    }
}

export default AudienceCodeForm;