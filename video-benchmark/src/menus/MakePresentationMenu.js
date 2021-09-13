import React, { useContext } from "react";
import UserContext from "../hooks/UserContext";

function MakePresentationMenu() {
    const { stage } = useContext(UserContext);

    return (
        <div className="MakePresentationMenu">
            MakePresentationMenu
            Stage = {stage}
        </div>
    );
}

export default MakePresentationMenu;