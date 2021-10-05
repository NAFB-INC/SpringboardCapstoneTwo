import "./css/PresentationForm.css";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import useFields from "../hooks/useFields";
import UserContext from "../hooks/UserContext";
import VideoAPI from "../api/VideoAPI";

// form used when creating a new presentation
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

    //will store the presentation in session storage, just in case you navigate away early
    //also avoids verifying password again
    useEffect(()=>{
        let myStoredCode = sessionStorage.getItem("code");
        if(myStoredCode && sessionStorage.getItem("secure_hash")==="not_secure"){
            setYourCode(myStoredCode)
        }
    },[]);

    //function that sends data to api for creation then returns code (onSubmit)
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

    //cute little button animation upon successful submit, but also all the possible errors.
    //name and presentation title are not actually required, and can be ignored on submitting twice
    const handleSubmit = e => {
        e.preventDefault();
        console.log("submitted");
        let button = document.querySelector('.submit-button');
        let buttonText = document.querySelector('.tick');
        const tickMark = "<svg width=\"58\" height=\"45\" viewBox=\"0 0 58 45\" xmlns=\"http://www.w3.org/2000/svg\"><path fill=\"#fff\" fill-rule=\"nonzero\" d=\"M19.11 44.64L.27 25.81l5.66-5.66 13.18 13.18L52.07.38l5.65 5.65\"/></svg>";

        let newErrors = [];
        if(!formData.presenter_pass){
            newErrors.push("A presenter password is required!");
            console.log("no pass!")
        }else {
            if((!formData.presenter_name_first || !formData.presenter_name_last) && !warned){
                setWarned(true);
                newErrors.push("While a name is not required, it is highly recommended. Submit again to ignore.")
            }
            if(!formData.presentation_title && !warned){
                setWarned(true);
                newErrors.push("While a presentation title is not required, it is highly recommended. Submit again to ignore.")
            }
        }

        //if no errors, create
        if(newErrors.length === 0){
            try{
                setErrors([]);
                buttonText.innerHTML = tickMark;
                button.classList.toggle('button__circle');
                setTimeout(()=>{
                    window.scrollTo(0,0);
                    createPresentation();
                },1000)        
            }catch(e){
                setErrors([`${e}`])
            }
        }else{
            setErrors([...newErrors]);
        }
    }

    // if we dont have a code returned yet, display the form.
    //otherwise, display the code.
    if(typeof yourCode !== "string"){
        return (
            <div className="PresentationForm">
                <div className="form-header">Let's create a new presentation!</div>
                <div className="info-box">
                    <p>Once created, you can access your presentation using the presentation code you will be given, and the password you set. Don't lose it!</p>
                    <p>You can start your presentation at any time in the next <b>30 days</b> without needing to create a new one.</p>
                    <p>All you need to do is send that presentation code (or a direct audience link) to anyone you want to join!</p>
                </div>

                
                <form onSubmit={handleSubmit}>
                    <div className="form-box">
                        <label htmlFor="presentation_title">Presentation Title: </label>
                        <input autoComplete="presentation-title" name="presentation_title" type="text" placeholder="Major Budget Overhaul" value={formData.presentation_title} onChange={handleChange}></input>
                    </div>
                    <div className="form-box">
                        <label htmlFor="presenter_name_first">Presenter's First Name: </label>
                        <input autoComplete="first-name" name="presenter_name_first" type="text" placeholder="Joe" value={formData.presenter_name_first} onChange={handleChange}></input>
                    </div>
                    <div className="form-box">
                        <label htmlFor="presenter_name_last">Presenter's Last Name: </label>
                        <input autoComplete="last-name" name="presenter_name_last" type="text" placeholder="Smith" value={formData.presenter_name_last} onChange={handleChange}></input>
                    </div>
                    <div className="form-box">
                        <label htmlFor="presenter_pass">Presenter Password: </label>
                        <input autoComplete="presenter-password" name="presenter_pass" type="password" placeholder="super secret" value={formData.presenter_pass} onChange={handleChange}></input>
                    </div>
                    <div><small>This will ensure only you can start the presentation. For demo purposes, do NOT use a secure password. Password security planned in future update.</small></div>
                    <div className="form-box">
                        <label htmlFor="presentation_description">[OPTIONAL] Presentation Description: </label>
                        <textarea autoComplete="presentation-description" name="presentation_description" type="text" placeholder="Something needs to be done about our 1st class travel spending..." value={formData.presentation_description} onChange={handleChange}></textarea>
                    </div>
                    <br/>
                    <div className="errors">
                            {errors.map((e)=>(
                                <li className="error" key={`error${e}`}>{e}</li>
                            ))}
                    </div>
                    <button className="submit-button">
	                    <div className="container">
	                    	<div className="tick">
                                Submit
	                    	</div>
	                    </div>
                    </button>
                </form>
            </div>
        );
    }else{
        return (
        <div className="PresentationForm">
            <div class="general-text">
                <div id="code-box">Your code is: <div id="code">{yourCode}</div></div>
                <br/>
                Don't lose it! You need to send this code or a direct audience link to anyone who is going to attend the presentation.
                You will also need it to start the presentation itself!
            </div>
        <div>
            <Link to={`/presenter/${yourCode}`}><button class="minor-choice-btn">Let me prepare for my presentation!</button> </Link>
        </div>
        <div className="link-div">Direct Audience Link: <a id="audience-a" href={`${baseURL}/audience/${yourCode}`}>{`${baseURL}/audience/${yourCode}`}</a></div>
        </div>
        );
    }
}

export default PresentationForm;