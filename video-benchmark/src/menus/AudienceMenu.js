import React from "react";
import { useParams } from "react-router-dom";


function AudienceMenu() {
    const { presID } = useParams();


    return (
        <div className="AudienceMenu">
            Audience Menu
            <div> Presentation: {presID} </div>
        </div>
    );
}

export default AudienceMenu;