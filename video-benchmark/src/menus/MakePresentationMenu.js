import React, { useContext } from "react";
import UserContext from "../hooks/UserContext";
import PresentationForm from "../forms/PresentationForm";

function MakePresentationMenu() {
    const { stage } = useContext(UserContext);

    return (
        <div className="MakePresentationMenu">
            MakePresentationMenu
            Stage = {stage}

            <PresentationForm />
        </div>
    );
}

export default MakePresentationMenu;