import React, {useState} from 'react';
import LabelSecondary from "../../commons/Label/LabelSecondary";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Checkbox from '@material-ui/core/Checkbox';
import ListItemText from '@material-ui/core/ListItemText';

import './GeneralCheckBox.css';

const GeneralCheckBox = ({one, arraysOptions}) => { return(

    <div className = 'generalCheckBox'>
        <LabelSecondary text={one}> </LabelSecondary>


        <Select
                // onChange={handleSelect}
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            className="form-combo-box"
                    // value={supportCenter}
                    //onChange={handleSelect}
            >
            {arraysOptions.map((options) => (
                <MenuItem key={options} value={options}>
                    {options}
                </MenuItem>
            ))}
        </Select>
 
    </div>

)}

export default GeneralCheckBox;