import React, { Component } from "react";
import "./CreateAlert.css";
import NavbarLO from "../../commons/NavBarLO/NavbarLO";
import LabelPrimary from "../../commons/components/Inicio/Label/LabelPrimary";
import Options from "../../commons/Options/Options";
import FormComboBox from "../../commons/ComboBox/FormComboBox";
import LabelSecondary from "../../commons/Label/LabelSecondary";
import { Button, TextField, createTheme, ThemeProvider } from "@material-ui/core";
import { saveAlert } from "../../service/AlertService";
import { involved } from "../../assets/involvedPersonList";
import axios from '../../utils/axios';
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


class CreateAlert extends Component {
    constructor(props) {
        super(props);
        this.state = { alertType: 0, risk: 0, description: '', selected: involved, types: [], risks: [] };
        this.isSelected = this.isSelected.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.handleTxtNameChange = this.handleTxtNameChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleRiskChange = this.handleRiskChange.bind(this);
        this.createAlert = this.createAlert.bind(this);
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

    createAlert(e) {
        //this.selectInvolved();
        const alert = {
            "alertDescription":this.state.description,
            "alertRiskLevel":this.state.risk,
	        "alertType":this.state.alertType
        };
        saveAlert(alert);
    }

    handleTxtNameChange(e){
        this.setState({description: e.target.value});
    }

    handleTypeChange(value){
        this.setState({alertType: value});
    }

    handleRiskChange(value){
        this.setState({risk: value});
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
                                    
                                    <LabelSecondary text='Tipo alerta'></LabelSecondary>
                                    <FormComboBox options={this.state.types} idName='alertTypeId' selected={this.handleTypeChange} value='alertTypeName'></FormComboBox>
                                    <LabelSecondary text='Riesgo'></LabelSecondary>
                                    <FormComboBox options={this.state.risks} idName='alertRskLevelId' selected={this.handleRiskChange} value='alertRskLevelName'></FormComboBox>
                                    <LabelSecondary text='Descripción'></LabelSecondary>
                                    <TextField value={this.state.description} onChange={this.handleTxtNameChange}></TextField>
                                    
                                   
                                </form>
                                <div className="btn-form">
                                    <Button color="primary" variant="contained" href="#contained-buttons" onClick={this.createAlert}>
                                        Enviar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>

        )
    }
}

export default CreateAlert;
