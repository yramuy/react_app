import React from "react";

const BoxHeader = ({ title }) => {
    return (
        <div className="box-header" style={{float: "left"}}>
            <h5>{title}</h5>
        </div>
    );
};

export default BoxHeader;