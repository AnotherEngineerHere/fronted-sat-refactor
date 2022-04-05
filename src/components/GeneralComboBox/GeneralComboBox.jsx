import React, { useState } from 'react';
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import LabelSecondary from "../../Label/LabelSecondary"
import './GeneralComboBox.css';

const GeneralComboBox = ({one, arraysOptions}) => { 
    
    const [supportCenter, setSupportCenter] = useState(" ");
    
    const handleSelect = (event) => { setSupportCenter(event.target.value)  
    
    }
    return (
    <div className = 'generalComboBox'>
        <LabelSecondary text={one}> </LabelSecondary>
            <Select
                labelId="demo-controlled-open-select-label"
                id="demo-controlled-open-select"
                className="form-combo-box"
                    value={supportCenter}
                    onChange={handleSelect}
                >
                {arraysOptions.map((options) => (
                    <MenuItem key={options} value={options}>
                        {options}
                    </MenuItem>
                ))}
            </Select>
    
    </div>

)}

export default GeneralComboBox