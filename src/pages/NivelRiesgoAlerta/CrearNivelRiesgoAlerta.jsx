import React, { useState } from "react";

import { useFormik } from "formik";
import { Input, Row, Col} from "antd";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import LabelInput from "../../components/LabelInput";
import { secondaryColor } from "../../commons/constants/StylesConstants";
import { usePostAlertRiskLevelMutation } from "../../redux/api/mainAPI";
import { useParams } from "react-router";

/**
 * @name CrearNivelRiesgoAlerta
 * @returns La página que permite crear los niveles de riesgo.
 */
const CrearNivelRiesgoAlerta = () => {
  const { idAlert } = useParams();
  const [alertRiskLevel, setAlertRiskLevel] = useState();
  const [createAlertRiskLevel] = usePostAlertRiskLevelMutation();

  /**
   * Se encarga de guardar un nivel de riesgo.
   * Este hace el llamado de la petición de POST de mainAPI.
   */
  const SaveAlertRiskLevel = async () => {
    const newAlertRiskLevel = {
      alertRskLevelName: alertRiskLevel,
    };
    //console.log(newAppointment);
    const {
      data: postAlertRiskLevelData,
      error: postAlertRiskLevelError,
      isLoading,
    } = await createAlertRiskLevel(newAlertRiskLevel);
  };

  console.log(idAlert);
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
    },

    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <SectionTitle title={"Crear nivel de riesgo"}>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: 30,
          borderRadius: 16,
          boxShadow: "rgba(53, 65, 143, 0.16) 0px 2px 27px 0px",
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Row gutter={10}>
            <Col xs={12} md={12}>
              <LabelInput labelText={"Nombre"} nameInput={"firstName"} />
              <Input
                placeholder="Descripción"
                id="firstName"
                name="firstName"
                type="text"
                onChange={(event) =>
                  setAlertRiskLevel(event.target.value)
                }
                value={alertRiskLevel}
                rows={2}
              />
            </Col>
          </Row>

          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "flex-end",
              marginTop: 20,
            }}
          >
            <button
              style={{
                backgroundColor: secondaryColor,
                color: "white",
                borderColor: secondaryColor,
                height: "30px",
                width: "80px",
                borderRadius: "3px",
              }}
              type="submit"
              onClick={SaveAlertRiskLevel}>Crear</button>
          </div>
        </form>
      </div>
    </SectionTitle>
  );
};

export default CrearNivelRiesgoAlerta;
