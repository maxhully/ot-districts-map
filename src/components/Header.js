import React from "react";
import "./Header.css";
import Status from "./Status";

const Header = ({ status }) => {
    return (
        <header>
            <h1>Optimal Transport Districts</h1>
            <Status status={status} />
        </header>
    );
};

export default Header;
