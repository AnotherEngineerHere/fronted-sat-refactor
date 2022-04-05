import React, { Component } from "react";
import "./CreateAlertInstance.css";
import NavbarLO from "../../commons/NavBarLO/NavbarLO";
import LabelPrimary from "../../commons/components/Inicio/Label/LabelPrimary";
import Options from "../../commons/Options/Options";
import FormComboBox from "../../commons/ComboBox/FormComboBox";
import LabelSecondary from "../../commons/Label/LabelSecondary";
import { Button, TextField, createTheme, ThemeProvider } from "@material-ui/core";
import { saveAlertInstance } from "../../service/AlertInstanceService";
import { involved } from "../../assets/involvedPersonList";
import { alertStates } from "../../assets/alertStatesList";
import axios from '../../utils/axios';
import {options} from '../../assets/ActivatedDeactivated';
//import { createTheme, ThemeProvider } from '@material-ui/material/styles';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#64748B',
            contrastText: '#fff',
        },
    },
});


class CreateAlertInstance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            alertType: 0,
            risk: 0,
            preAlert: 0,
            description: '',
            alertState: '',
            alertDeactivate: '',
            alertStateList: alertStates,
            selected: involved,
            types: [],
            risks: [],
            preAlerts: [],
            deactivateOp: options
        };
        this.isSelected = this.isSelected.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleTxtNameChange = this.handleTxtNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleRiskChange = this.handleRiskChange.bind(this);
        this.createAlertInstance = this.createAlertInstance.bind(this);
        this.handleStateChange = this.handleStateChange.bind(this);
        this.handleAlertDeactivateChange = this.handleAlertDeactivateChange.bind(this);
        this.handlePreAlertChange = this.handlePreAlertChange.bind(this);
    }

    componentDidMount(){
        const path = "alert-risk-level/";
        axios.get(path).then(res => {
            const result = res.data;
            this.setState({ risks: result });
        });
        const path2 = "alert-type/";
        axios.get(path2).then(res => {
            const result = res.data;
            this.setState({ types: result });
        });
        const path3 = "alert/";
        axios.get(path3).then(res => {
            const result = res.data;
            this.setState({ preAlerts: result });
        });
    }

    selectInvolved(e) {
        e.preventDefault();
        let seleInvolved = this.state.selected.filter(el => el.check);
    }

    isSelected(e) {
        let options = [...this.state.selected];
        let ind = options.findIndex(el => el.nameInvolved === e.target.name);
        options[ind].check = !options[ind].check;
        this.setState({
            opt: [...options]
        });
    };

    createAlertInstance(e) {
        //this.selectInvolved();
        const alert = {
            "alertDescription":this.state.description,
            "alertState":this.state.alertState === 1 ? 'Atendida' : this.state.alertState === 2 ? 'No atendida' : 'En espera',
            "alertDeactivate":this.state.alertDeactivate === '1' ? 'True': 'False',
            "alertID":this.state.preAlert,
        };
        saveAlertInstance(alert);
    }

    handleTxtNameChange(e){
        this.setState({description: e.target.value});
    }

    handleTypeChange(value){
        this.setState({alertType: value});
    }

    handleStateChange(value){
        this.setState({alertState: value});
    }
    
    handleAlertDeactivateChange(value){
        this.setState({alertDeactivate: value});
    }
    handleRiskChange(value){
        this.setState({risk: value});
    }

    handlePreAlertChange(value){
        this.setState({preAlert: value});
    }

    render() {
        return (
            <ThemeProvider theme={theme}>
                <div className="navbarLO-container">
                    <NavbarLO></NavbarLO>
                    <div className="general-container">
                        <Options></Options>
                        <div className="information-container">
                            <div className="label-container">
                                <LabelPrimary text="Crear Alerta"></LabelPrimary>
                                <form className="form-container">
                                    <LabelSecondary text='Estudiante'></LabelSecondary>
                                    <FormComboBox></FormComboBox>
                                    <LabelSecondary text='Alertas predefinidas'></LabelSecondary>
                                    <FormComboBox options={this.state.preAlerts} idName='alertId' selected={this.handlePreAlertChange} value='alertName'></FormComboBox>
                                    <LabelSecondary text='Estado'></LabelSecondary>
                                    <FormComboBox options={this.state.alertStateList} idName='alertState' selected={this.handleStateChange} value='alertTypeName'></FormComboBox>
                                    <LabelSecondary text='Desactivar'></LabelSecondary>
                                    <FormComboBox options={this.state.deactivateOp} idName='alertDeactivate' selected={this.handleAlertDeactivateChange} value='alertTypeName'></FormComboBox>
                                    <LabelSecondary text='Descripción'></LabelSecondary>
                                    <TextField value={this.state.description} onChange={this.handleTxtNameChange}></TextField>
                                    <LabelSecondary text='Involucrados'></LabelSecondary>
                                    <div>
                                        {this.state.selected.map(el => {
                                            return (
                                                <div key={el.nameInvolved}>
                                                    <span>{el.nameInvolved}</span>
                                                    <input
                                                        type="checkbox"
                                                        name={el.nameInvolved}
                                                        value={el.check}
                                                        onChange={this.isSelected}
                                                    />
                                                </div>
                                            )
                                        })}
                                    </div>
                                </form>
                                <div className="btn-form">
                                    <Button color="primary" variant="contained" href="#contained-buttons" onClick={this.createAlertInstance}>
                                        Crear
                                    </Button>
                                </div>
                                <div className="btn-form">
                                   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>

        )
    }
}

export default CreateAlertInstance;
