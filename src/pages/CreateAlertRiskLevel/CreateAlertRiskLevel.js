import React, { Component } from "react";
import "./CreateAlertRiskLevel.css";
import NavbarLO from "../../commons/NavBarLO/NavbarLO";
import LabelPrimary from "../../commons/components/Inicio/Label/LabelPrimary";
import Options from "../../commons/Options/Options";
import LabelSecondary from "../../commons/Label/LabelSecondary";
import { Button, createTheme, TextField, Grid, ThemeProvider } from "@material-ui/core";
import { saveRiskLevel } from "../../service/AlertRiskLevelService";

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
        this.state = {
            txtNameValue: '',
            nameAlertRisk: '',
        };
        this.handleTxtNameChange = this.handleTxtNameChange.bind(this);
        this.saveAlertRisk = this.saveAlertRisk.bind(this);
        //Revisar el crear alerta  y cambiarle el estilo
    }

    handleTxtNameChange(e) {
        this.setState({ txtNameValue: e.target.value });
    }

    saveAlertRisk(e) {
        saveRiskLevel(this.state.txtNameValue).then(data => {
            console.log(data);
        })
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
                                <LabelPrimary text="Crear Nivel de Riesgo"></LabelPrimary>

                                <Grid
                                    item
                                    md={12}
                                    xs={12}
                                    alignItems="center"
                                    container
                                >
                                    <LabelSecondary text='Nombre'></LabelSecondary>

                                </Grid>
                                <Grid
                                    item
                                    md={20}
                                    xs={12}
                                    alignItems="center"
                                    container
                                >
                                    <TextField value={this.state.txtNameValue} onChange={this.handleTxtNameChange}></TextField>
                                </Grid>
                                <div className="btn-form">
                                    <Button color="primary" variant="contained" href="#contained-buttons" onClick={this.saveAlertRisk} text="Enviar">Enviar</Button>
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
