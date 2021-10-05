import "./css/PresentVsAudienceForm.css";
import React from "react";

function PresentVsAudienceForm({setPvA}) {

    return (
        <div className="PresentVsAudienceForm">
            Are you the Presenter or the Audience?
            <div className="major-choice-2">
                <button className="major-choice-btn" onClick={()=>setPvA("Presenter")}>I Am The Presenter</button>
                <button className="major-choice-btn" onClick={()=>setPvA("Audience")}>I Am Amongst The Audience</button>
            </div>
        </div>
    );
}

export default PresentVsAudienceForm;