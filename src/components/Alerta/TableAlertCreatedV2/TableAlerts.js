import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import axios from "../../../utils/axios";
import { CSVLink } from "react-csv";
import { Autocomplete } from "@material-ui/lab";
import CancelIcon from '@material-ui/icons/Cancel';
import {
    Grid,
    Typography,
    Card,
    CardContent,
    Button,
    TextField,
} from "@material-ui/core";


const headers = [
    {key: 'nombreEnElBack1', label: 'Estudiante'},
    {key: 'nombreEnElBack2', label: 'Riesgo'},
    {key: 'nombreEnElBack3', label: 'Categoria'},
    {key: 'nombreEnElBack4', label: 'Motivo'},
];

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.default,
        height: "100%",
    },
    container: {
        maxHeight: 440,
    },
    grid: {
        margin: theme.spacing(0, 0),
        width: "100%",
        height: "100%",
        justifyContent: "center",
    },
    content: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    contentHeader: {
        display: "flex",
        alignItems: "center",
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(2),
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(2),
    },
    contentBody: {
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center",
        },
    },
    title: {
        marginTop: theme.spacing(3),
    },
    sugestion: {
        marginTop: theme.spacing(2),
    },
    textField: {
        width: 300,
    },
    text: {
        fontFamily: "Tajawal",
        fontStyle: "normal",
        fontWeight: "bold",
        fontSize: 36,
        color: "#2764E3",
    },
    reportButton: {
        marginTop: theme.spacing(8),
        flexGrow: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        [theme.breakpoints.down("md")]: {
            justifyContent: "center",
        },
    },
    card: {
        margin: theme.spacing(0, 0),
        marginBottom: 10,
        width: "100%",
        height: "100%",
        justifyContent: "center",
        backgrounColor: "#2764E3",
        borderRadius: 15,
    },
    top: {
        fontSize: 16,
        textAlign: 'left'
    },
    titleCard: {
        margin: theme.spacing(0, 0),
        height: "80%",
        justifyContent: "center",
    },
    gridContainer: {
        marginRight: theme.spacing(20),
    },
}));

const TableAlerts = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
}
