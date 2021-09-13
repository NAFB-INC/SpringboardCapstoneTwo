import React,{useContext} from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../hooks/UserContext";

function Navigation() {
    const { setPvA,setStage } = useContext(UserContext);

    function resetData(){
        setPvA("");
        setStage(1);
    }
    return (
        <nav>
            <NavLink to="/" onClick={()=>resetData()}>
                Home
            </NavLink>
        </nav>
    );
}

export default Navigation;
