import React from "react";

function PresentVsAudienceForm({setPvA}) {

    return (
        <div className="PresentVsAudienceForm">
            Are you the Presenter or the Audience?
            <button onClick={()=>setPvA("Presenter")}>Presenter</button>
            <button onClick={()=>setPvA("Audience")}>Audience</button>
        </div>
    );
}

export default PresentVsAudienceForm;