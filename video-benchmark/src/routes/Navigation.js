import React,{useContext} from "react";
import { NavLink } from "react-router-dom";
import UserContext from "../hooks/UserContext";

function Navigation() {
    const { setPvA } = useContext(UserContext);
    return (
        <nav>
            <NavLink to="/" onClick={()=>setPvA("")}>
                Home
            </NavLink>
        </nav>
    );
}

export default Navigation;
