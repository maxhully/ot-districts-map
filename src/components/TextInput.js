import React from "react";

const TextInput = props => (
    <React.Fragment>
        <label>{props.label}:</label>
        <input type={"text"} value={props.value} onChange={props.onChange} />
    </React.Fragment>
);

export default TextInput;
