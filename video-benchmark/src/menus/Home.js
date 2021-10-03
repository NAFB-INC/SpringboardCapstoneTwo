import "./css/Home.css";
import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import PresentVsAudienceForm from "../forms/PresentVsAudienceForm"
import UserContext from "../hooks/UserContext";

function Home() {
    const { pvA, setPvA, setStage } = useContext(UserContext);

    function changeCurrent(id){
        var elements = document.getElementsByClassName("current");
        if(elements.length > 0){
            elements[0].classList.remove("current");
        }
        document.getElementById(id).classList.add("current");
    }

    function presentMenu() {
        if(pvA === "Audience"){
            return (
            <div class="major-choice-2">
                <Link to={`/audience`} onClick={()=>{
                    changeCurrent("audience-link");
                    setStage(2);
                }}>
                    <button class="major-choice-btn-home">
                        I Want to Watch a Current or Upcoming Presentation!
                    </button>
                </Link>
                <Link to={`/audience/past`} onClick={()=>{
                    changeCurrent("audience-link");
                    setStage(4);
                }}>
                    <button class="major-choice-btn-home">
                        I Want to Review a Past Presentation!
                    </button>
                </Link>
            </div>
            )
            
        }else if(pvA === "Presenter"){
            return (
                <div class="major-choice-2">
                    <Link to={`/presenter/create`} onClick={()=>{
                        changeCurrent("presenter-link");
                        setStage(2);sessionStorage.clear();
                        }}>
                        <button class="major-choice-btn-home">
                            I Want to <u>Create</u> or <u>Schedule</u> a New Presentation!
                        </button>
                    </Link>
                    <Link to={`/presenter`} onClick={()=>{
                        changeCurrent("presenter-link");
                        setStage(1);
                    }}>
                        <button class="major-choice-btn-home">
                            I Want to <u>Prepare</u> or <u>Rejoin</u> a Presentation that was Already Made!
                        </button>
                    </Link>
                </div>
                )
        }
    }

    return (
        <div className="home">
            {pvA ? presentMenu() :             
            <div id="welcome"> Welcome to the Presentation Benchmarker!
            <PresentVsAudienceForm setPvA={setPvA}/>
            </div>}
        </div>
    );
}

export default Home;