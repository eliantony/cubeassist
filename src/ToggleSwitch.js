import React from "react";
import "./ToggleSwitch.css";

// Refer : https://www.geeksforgeeks.org/how-to-create-a-toggle-switch-in-react-as-a-reusable-component/ 
export default class ToggleSwitch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            label: props.label,
            onChange: props.onChange,
            isOn : props.isOn
        }
    }

    _onChange = (e) => {
        let isChecked = e.target.checked;

        this.setState(
            {
                isOn : isChecked
            }
        );

        this.state.onChange(
            {
                value: isChecked
            });
    }

    render() {

        let label = this.state.label;
        let isOn = this.state.isOn;

        return(            
            <div className = "toggle-switch-root" >           
                <div className="toggle-switch-label">{label}</div>
                <div className="toggle-switch-container">
                    <div className="toggle-switch" >
                        <input type="checkbox" className="checkbox"
                            name={label} id={label} onChange={this._onChange} checked={isOn}/>
                        <label className="label" htmlFor={label}>
                            <span className="inner" />
                            <span className="switch"/>
                        </label>
                    </div>
                </div>
            </div>
            );
        }
};
