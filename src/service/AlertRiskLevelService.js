import axios from '../utils/axios';

const path = "alert-risk-level/";

export const getAllRiskLevels = () => {
    console.log("Peticion de obtener niveles de riesgo en proceso...");
    return axios.get(path).then(res => {
        console.log("Axios request");
        console.log(res);
    });
}

export const saveRiskLevel = (alertRiskLevel) => {
    console.log("Peticion de guardar nivel de riesgo en proceso...");
    return axios.post(
        path, 
        {"alertRskLevelName": alertRiskLevel})
        .then(res => res.data);
}
