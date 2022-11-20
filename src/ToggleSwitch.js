import React from "react";
import "./ToggleSwitch.css";

const ToggleSwitch = ({ label }) => {
    return (
        <div className="toggle-switch-root">
            <div className="toggle-switch-label">{label}</div>
            <div className="toggle-switch-container">
                <div className="toggle-switch">
                    <input type="checkbox" className="checkbox"
                        name={label} id={label} />
                    <label className="label" htmlFor={label}>
                        <span className="inner" />
                        <span className="switch" />
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ToggleSwitch;
