import React, {useState} from 'react';
import LabelSecondary from "../../Label/LabelSecondary";
import TextField from "@material-ui/core/TextField";
import TextArea from "../../TextArea/FormTextArea";
import './GeneralInput.css';



const GeneralInput = ({one}) => { 
    
    
    const [setMotivo] = useState(" ");
    const handleSelect = (event) => { setMotivo(event.target.value)  
        console.log(event.target.value)
    }
    
    return(

    
    <div className = 'generalInput'>
        <LabelSecondary text={one}> </LabelSecondary>
       
        <TextField className = 'form-text-field' 
            fullWidth id="outlined-basic" 
            label = ""
            multiline
            rows={4} 
            onChange = {handleSelect}
            variant="outlined" 
        />
    
    </div>

)}

export default GeneralInput;