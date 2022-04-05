import axios from '../utils/axios';

const path = "alert/";

export const getAllAlerts = () => {
    console.log("Peticion de obtener alerta en proceso...");
    return axios.get(path).then(res => {
        console.log("Axios request");
        console.log(res);
    });
}

export const saveAlert = (alert) => {
    console.log("Peticion de guardar alerta en proceso...");
    return axios.post(path, alert)
        .then(res => res.data);
}
