import axios from '../utils/axios';

const path = "alert-type/";

export const getAllAlertTypes = () => {
    console.log("Peticion de obtener tipos de alerta en proceso...");
    return axios.get(path).then(res => res.data);
}

export const saveAlertType = (alertType) => {
    console.log("Peticion de agregar tipo de alerta en proceso...");
    return axios.post(path, {"permPermId":1, "alertTypeName": alertType}).then(res => res.data);
}

