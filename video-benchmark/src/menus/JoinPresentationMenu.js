import React, { useContext,useState } from "react";
import { Link } from "react-router-dom";
import UserContext from "../hooks/UserContext";
import AudienceCodeForm from "../forms/AudienceCodeForm";

function JoinPresentationMenu() {
    const { stage,setStage } = useContext(UserContext);
    const [code,setCode] = useState();

    function stageSelection(){
        if(stage===2){
            return(
                <div>
                    <AudienceCodeForm setCode={setCode}/>
                </div>
            );
        }
        else if(stage===3){
            return(
                <div>
                    Found a match!
                    <Link to={`/audience/${code}`}>
                        <div>
                            Video {code} by Steve Sample
                        </div>
                    </Link>
                </div>
            );
        }else{
            setStage(2)
        }
    };
    
    return (
        <div className="JoinPresentationMenu">
            JoinPresentationMenu
            {stageSelection()}
        </div>
    );
}

export default JoinPresentationMenu;