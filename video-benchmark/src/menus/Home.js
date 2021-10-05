import "./css/Home.css";
import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import PresentVsAudienceForm from "../forms/PresentVsAudienceForm"
import UserContext from "../hooks/UserContext";

//this home menu looks very different depending on user, and changes the stage based on buttons clicked.
//these questions help determine what the user is here for, and direct them to the correct endpoint.
function Home() {
    const { pvA, setPvA, setStage } = useContext(UserContext);

    //function for highlighting which tab the user is on in the nav bar
    function changeCurrent(id){
        var elements = document.getElementsByClassName("current");
        if(elements.length > 0){
            elements[0].classList.remove("current");
        }
        document.getElementById(id).classList.add("current");
    }

    //function for organizing the html returned
    function presentMenu() {
        //audience can choose to watch a current or old video
        if(pvA === "Audience"){
            return (
            <div class="major-choice-2">
                <Link to={`/audience`} onClick={()=>{
                    changeCurrent("audience-link");
                    setStage(2);
                }}>
                    <button class="major-choice-btn-home">
                        I Want to <u>Watch</u> a Current or Upcoming Presentation!
                    </button>
                </Link>
                <Link to={`/audience/past`} onClick={()=>{
                    changeCurrent("audience-link");
                    setStage(4);
                }}>
                    <button class="major-choice-btn-home">
                        I Want to <u>Review</u> a Past Presentation!
                    </button>
                </Link>
            </div>
            )
        //presenter can choose to make a new presentation or prepare one that is already made  
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