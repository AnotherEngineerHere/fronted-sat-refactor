import React, { useContext, useState } from "react";
import LabelSecondary from "../../../commons/Label/LabelSecondary";
import { sortLabels } from "../../../constants/sortAppointments";
import AppContext from "../../../store/AppContextAppointment";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import "./AppointmentsSort.css";
//import FormComboBox from "../../commons/ComboBox/FormComboBox";

const AppointmentsSort = () => {
  const state = useContext(AppContext);
  const [sortType, setSortType] = useState(sortLabels[0]);

  const handleSelect = (event) => {
    const itemSelected = event.target.value;
    setSortType(itemSelected);
    state.sortAppointmentsTable(itemSelected);
  };

  return (
    <div className="appointmentSort">
      <div className="inside-box">
        <LabelSecondary className="labelSort" text="Order by:"></LabelSecondary>
        <FormControl className="form-combo-box formSort">
          <InputLabel id="demo-controlled-open-select-label"></InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            className="form-combo-box"
            value={sortType}
            onChange={handleSelect}
          >
            {sortLabels.map((sortLabel) => (
              <MenuItem key={sortLabel} value={sortLabel}>
                {sortLabel}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    </div>
  );
};

export default AppointmentsSort;
