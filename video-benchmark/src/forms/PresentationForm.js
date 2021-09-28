import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useFields from "../hooks/useFields";
import UserContext from "../hooks/UserContext";
import VideoAPI from "../api/VideoAPI";

function PresentationForm() {
    const { baseURL } = useContext(UserContext);
    const [errors,setErrors] = useState([]);
    const [warned,setWarned] = useState(false);
    const [yourCode,setYourCode] = useState();
    const [formData, handleChange] = useFields({
        presenter_name_first: '',
        presenter_name_last: '',
        presentation_title: '',
        presentation_description: '',
        presenter_pass: ''
    })

    useEffect(()=>{
        let myStoredCode = sessionStorage.getItem("code");
        if(myStoredCode && sessionStorage.getItem("secure_hash")==="not_secure"){
            setYourCode(myStoredCode)
        }
    },[]);

    function createPresentation(){
        async function create(){
            return(
                await VideoAPI.createPresentation({
                    first:formData.presenter_name_first,
                    last:formData.presenter_name_last,
                    title:formData.presentation_title,
                    desc:formData.presentation_description,
                    pass:formData.presenter_pass
                })
            );
        }
        create().then((res)=>{
            setYourCode(res);
            sessionStorage.setItem('code',`${res}`);
            sessionStorage.setItem('secure_hash','not_secure');
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        console.log("submitted");
        let newErrors = [];
        if(!formData.presenter_pass){
            newErrors.push("A presenter password is required!");
            console.log("no pass!")
        }else {
            if((!formData.presenter_name_first || !formData.presenter_name_last) && !warned){
                setWarned(true);
                newErrors.push("While a name is not technically required, it is highly recommended so people know they are joining the right presentation. Submit again to ignore.")
            }
            if(!formData.presentation_title && !warned){
                setWarned(true);
                newErrors.push("While a presentation title is not technically required, it is highly recommended so people know they are joining the right presentation. Submit again to ignore.")
            }
        }


        if(newErrors.length === 0){
            try{
                setErrors([]);
                createPresentation();
            }catch(e){
                setErrors([`${e}`])
            }
        }else{
            setErrors([...newErrors]);
        }
    }

    if(typeof yourCode !== "string"){
        return (
            <div className="PresentationForm">
                <div>Let's create a new presentation!</div>
                <p>Once created, you can access your presentation using the presentation code you will be given, and the password you set. Don't lose it!</p>
                <p>You can start your presentation at any time in the next 30 days without needing to create a new one.</p>
                <p>All you need to do is send that presentation code (or a direct audience link) to anyone you want to join!</p>
                
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="presentation_title">Presentation Title: </label>
                        <input autoComplete="presentation-title" name="presentation_title" type="text" placeholder="Major Budget Overhaul" value={formData.presentation_title} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="presenter_name_first">Presenter's First Name: </label>
                        <input autoComplete="first-name" name="presenter_name_first" type="text" placeholder="Joe" value={formData.presenter_name_first} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="presenter_name_last">Presenter's Last Name: </label>
                        <input autoComplete="last-name" name="presenter_name_last" type="text" placeholder="Smith" value={formData.presenter_name_last} onChange={handleChange}></input>
                    </div>
                    <div>
                        <label htmlFor="presenter_pass">Presenter Password: </label>
                        <input autoComplete="presenter-password" name="presenter_pass" type="password" placeholder="super secret" value={formData.presenter_pass} onChange={handleChange}></input>
                    </div>
                    <div><small>This will ensure only you can start the presentation. For demo purposes, do NOT use a secure password. Password security planned in future update.</small></div>
                    <div>
                        <label htmlFor="presentation_description">[OPTIONAL] Presentation Description: </label>
                        <textarea autoComplete="presentation-description" name="presentation_description" type="text" placeholder="Something needs to be done about our 1st class travel spending..." value={formData.presentation_description} onChange={handleChange}></textarea>
                    </div>
                    <br/>
                    <div>
                            {errors.map((e)=>(
                                <li className="error" key={`error${e}`}>{e}</li>
                            ))}
                    </div>
                    <button>Submit</button>
                </form>
            </div>
        );
    }else{
        return (
        <div className="PresentationForm">
            <div>
                Your code is: <div>{yourCode}</div>
                Don't lose it! You need to send this code or a direct audience link to anyone who is going to attend the presentation.
                You will also need it to start the presentation itself!
            </div>
        <div>
            <Link to={`/presenter/${yourCode}`}><button>Let me prepare for my presentation!</button> </Link>
        </div>
        <div>Direct Audience Link: <a href={`${baseURL}/audience/${yourCode}`}>{`${baseURL}/audience/${yourCode}`}</a></div>
        </div>
        );
    }
}

export default PresentationForm;