import React from "react";

const Status = ({ status }) => {
    return status ? <div className="status">{status}</div> : null;
};

export default Status;
