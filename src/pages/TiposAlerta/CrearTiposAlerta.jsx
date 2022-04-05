import React, { useState } from "react";
import { Input, Row, Col } from "antd";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import LabelInput from "../../components/LabelInput";
import { secondaryColor } from "../../commons/constants/StylesConstants";
import { usePostAlertTypeMutation } from "../../redux/api/mainAPI";
import { useParams } from "react-router";

/**
 * @name CrearTipoAlerta
 * @returns La página que permite crear los tipos de alerta.
 */
const CrearTipoAlerta = () => {
  const { idAlert } = useParams();
  const [alertType, setAlertType] = useState();
  const [createAlertType] = usePostAlertTypeMutation();

  /**
   * Se encarga de guardar un tipo de alerta.
   * Este hace el llamado de la petición de POST de mainAPI.
   */
  const SaveAlertType = async () => {
    const newAlertType = {
      alerttpName: alertType,
    };
    const {
      data: postTypeData,
      error: postAlertTypeError,
      isLoading,
    } = await createAlertType(newAlertType);
  };

  console.log(idAlert);

  return (
    <SectionTitle title={"Crear tipos de alerta"}>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: 30,
          borderRadius: 16,
          boxShadow: "rgba(53, 65, 143, 0.16) 0px 2px 27px 0px",
        }}
      >
        <Row gutter={10}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Nombre"} nameInput={"firstName"} />
            <Input
              placeholder="Descripción"
              id="firstName"
              name="firstName"
              type="text"
              onChange={(event) => setAlertType(event.target.value)}
              value={alertType}
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
            onClick={SaveAlertType}
          >
            Crear
          </button>
        </div>
      </div>
    </SectionTitle>
  );
};

export default CrearTipoAlerta;
