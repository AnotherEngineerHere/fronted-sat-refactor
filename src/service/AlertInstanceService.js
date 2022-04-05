import axios from '../utils/axios';

const path = "alert-instance/";

export const getAllAlertsInstance = () => {
    console.log("Peticion de obtener instancia alerta en proceso...");
    return axios.get(path).then(res => {
        console.log("Axios request");
        console.log(res);
    });
}

export const saveAlertInstance = (alert) => {
    console.log("Peticion de guardar instancia alerta en proceso...");
    return axios.post(path, alert)
        .then(res => res.data);
}
