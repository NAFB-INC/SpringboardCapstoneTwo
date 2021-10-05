import "./css/MakePresentationMenu.css";
import React from "react";
import PresentationForm from "../forms/PresentationForm";

//simi unused parent for making a presentation
//this is mostly here for planned future changes and flexibility
function MakePresentationMenu() {
    return (
        <div className="MakePresentationMenu">
            <PresentationForm />
        </div>
    );
}

export default MakePresentationMenu;