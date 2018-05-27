import React from "react";

import "./Controls.css";

const Controls = props => (
    <ul>{props.children.map((control, i) => <li key={i}>{control}</li>)}</ul>
);
export default Controls;
