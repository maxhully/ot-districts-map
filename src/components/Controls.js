import React from "react";

import "./Controls.css";

const Controls = props => (
    <ul>
        <li>
            <label>State</label> <input />
        </li>
        <li>
            <label>Number of Districts</label> <input />
        </li>
        <li>
            <button onClick={() => console.log("Go!")}>Go</button>
        </li>
    </ul>
);
export default Controls;
