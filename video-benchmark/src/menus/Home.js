import React, { useContext }  from "react";
import { Link } from "react-router-dom";
import PresentVsAudienceForm from "../forms/PresentVsAudienceForm"
import UserContext from "../hooks/UserContext";

function Home() {
    const { pvA, setPvA, setStage } = useContext(UserContext);

    function presentMenu() {
        if(pvA === "Audience"){
            return (
            <div>
                <Link to={`/audience`} onClick={()=>setStage(2)}>
                    <div>
                        I want to watch a current or upcoming presentation!
                    </div>
                </Link>
                <Link to={`/audience/past`} onClick={()=>setStage(4)}>
                    <div>
                        I want to review a past presentation!
                    </div>
                </Link>
            </div>
            )
            
        }else if(pvA === "Presenter"){
            return (
                <div>
                    <Link to={`/presenter`} onClick={()=>setStage(2)}>
                        <div>
                            I want to create or schedule a new presentation!
                        </div>
                    </Link>
                    <Link to={`/presenter`} onClick={()=>setStage(3)}>
                        <div>
                            I want to prepare or rejoin a presentation that was already made!
                        </div>
                    </Link>
                </div>
                )
        }
    }

    return (
        <div className="Home">
            {pvA ? presentMenu() :             
            <div> Welcome to the Presentation Benchmarker!
            <PresentVsAudienceForm setPvA={setPvA}/>
            </div>}
        </div>
    );
}

export default Home;