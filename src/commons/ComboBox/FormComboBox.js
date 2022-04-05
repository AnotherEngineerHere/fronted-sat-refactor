import React from 'react';
import '../styles/FormComboBox.css';
//import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';

/*const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));*/

export default function ControlledOpenSelect(props) {
  const [open, setOpen] = React.useState(false);

  const handleChange = (event) => {
    props.selected(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //props.value => value = 'alertTypeName'
  const renderOptions = () => {
    if(props.options){
      return props.options.map(item => {
        const keys = Object.keys(item);
        return <MenuItem key={item[keys[0]]} value={item[keys[0]]}>{item[keys[1]]}</MenuItem>;
      });
    }else{
      return <MenuItem value={'Empty'}/>
    }
  }
  
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          onChange={handleChange}
          className='form-combo-box'
          fullWidth={true}
        >
          <MenuItem value={0} selected>Select your option</MenuItem>
          {renderOptions()}
        </Select>
    </div>
  );
}
