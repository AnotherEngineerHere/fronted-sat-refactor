import React from "react";

import { useFormik } from "formik";
import { Input, Row, Col } from "antd";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import LabelInput from "../../components/LabelInput";
import { useParams } from "react-router";

const EditarAlertas = () => {
  const { idAlert } = useParams();

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
    <SectionTitle title={"Editar alerta"}>
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
              <LabelInput labelText={"Riesgo"} nameInput={"firstName"} />
              <Input
                placeholder=""
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
            </Col>

            <Col xs={12} md={12}>
              <LabelInput
                labelText={"Visibilidad a estudiante"}
                nameInput={"visibilityStudent "}
              />
              <Input
                placeholder=""
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
            </Col>
          </Row>

          <Row gutter={10} style={{ marginTop: 20 }}>
            <Col xs={12} md={12}>
              <LabelInput
                labelText={"Tiempo máximo de atención"}
                nameInput={"maxTime "}
              />
              <Input
                placeholder=""
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
            </Col>

            <Col xs={12} md={12}>
              <LabelInput
                labelText={"Intervalo de notificación"}
                nameInput={"notificationInterval "}
              />
              <Input
                placeholder=""
                id="firstName"
                name="firstName"
                type="text"
                onChange={formik.handleChange}
                value={formik.values.firstName}
              />
              {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
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
            <button type="submit">Editar alerta</button>
          </div>
        </form>
      </div>
    </SectionTitle>
  );
};

export default EditarAlertas;
