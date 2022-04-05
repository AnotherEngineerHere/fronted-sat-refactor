import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useFormik } from "formik";
import { Input, Row, Col, Select, Tag } from "antd";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import LabelInput from "../../components/LabelInput";
import { secondaryColor } from "../../commons/constants/StylesConstants";
import {
  usePostPreAlertMutation,
  useGetRoleQuery,
  useGetAlertTypeQuery,
  useGetAlertRiskLevelQuery,
} from "../../redux/api/mainAPI";

import { useParams } from "react-router";
/**
 * @name CrearConfiguracionAlerta
 * @returns La página que permite configurar una alerta.
 */
const CrearConfiguracionAlerta = () => {
  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";

  const userInfo = permisos.includes("ROLE_Directive-AlertRiskLevel")
    ? "directive"
    : permisos.includes("ROLE_Admin-AlertRiskLevel")
    ? "adm"
    : "";

  const [alertType, setAlertType] = useState();
  const [alertRiskLevel, setAlertRiskLevel] = useState();
  const [description, setAlertDescription] = useState();
  const [createPreAlert] = usePostPreAlertMutation();
  const [selectInvolved, setSelectedInvolved] = useState([99]);

  const { idAlert } = useParams();
  const { Option } = Select;
  const { TextArea } = Input;
  const { CheckableTag } = Tag;

  const { data: roleData, error: roleError, roleLoading } = useGetRoleQuery();

  const role = roleData;

  const {
    data: alerttypeData,
    error: alerttypeError,
    alerttypeLoading,
  } = useGetAlertTypeQuery();

  /**
   * @name handleChangeInvolved
   * Maneja el estado de los involucrados seleccionados.
   * @param {*} tag
   * @param {*} checked
   */
  const handleChangeInvolved = (tag, checked) => {
    const selectInvolved1 = selectInvolved;
    const nextSelectedTags = checked
      ? [...selectInvolved1, tag.person.persId]
      : selectInvolved1.filter((t) => t !== tag.person.persId);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedInvolved(nextSelectedTags);
  };

  //Métodos para el select
  function onChange(value) {
    console.log(`selected ${value}`);
  }
  function onBlur() {
    console.log("blur");
  }
  function onFocus() {
    console.log("focus");
  }
  function onSearch(val) {
    console.log("search:", val);
  }
  const handleChangeAlertType = (value) => {
    setAlertType(value);
  };
  const handleChangeAlertRiskLevel = (value) => {
    setAlertRiskLevel(value);
  };

  /**
   * Se encarga de guardar una alerta predefinida.
   * Este hace el llamado de la petición de POST de mainAPI.
   */
  const SavePreAlert = async () => {
    console.log(`${description}, ${alertType}, ${alertRiskLevel}`);

    const newPreAlert = {
      alertDescription: description,
      alertType: +alertType,
      alertRiskLevel: +alertRiskLevel,
    };
    const {
      data: postPreAlertData,
      error: postPreAlertError,
      isLoading,
    } = await createPreAlert(userInfo, newPreAlert);
  };

  /**
   * La variable @var alertriskData almacena los niveles de riesgo recuperados.
   * Hace uso de la petición GET de mainAPI.
   */
  const {
    data: alertriskData,
    error: alertriskError,
    alertriskLoading,
  } = useGetAlertRiskLevelQuery();

  const formik = useFormik({
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  return (
    <SectionTitle title={"Configuración de alertas"}>
      <div
        style={{
          backgroundColor: "#ffffff",
          padding: 30,
          borderRadius: 16,
          boxShadow: "rgba(53, 65, 143, 0.16) 0px 2px 27px 0px",
        }}
      >
        <form>
          <Row gutter={10}>
            <Col xs={12} md={12}>
              <LabelInput
                labelText={"Tipo de alerta"}
                nameInput={"alertType"}
              />
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Tipo de alerta"
                optionFilterProp="children"
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                value={alertType}
                onChange={handleChangeAlertType}
              >
                {alerttypeData?.map((alerttype) => (
                  <Option value={alerttype.alerttpId} key={alerttype.alerttpId}>
                    {alerttype.alerttpName}
                  </Option>
                ))}
              </Select>
            </Col>

            <Col xs={12} md={12}>
              <LabelInput
                labelText={"Nivel de riesgo"}
                nameInput={"alertRiskLevel"}
              />
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Nivel de riesgo"
                optionFilterProp="children"
                onFocus={onFocus}
                onBlur={onBlur}
                onSearch={onSearch}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                value={alertRiskLevel}
                onChange={handleChangeAlertRiskLevel}
              >
                {alertriskData?.map((alertrisklevel) => (
                  <Option
                    value={alertrisklevel.alertRskLevelId}
                    key={alertrisklevel.alertRskLevelId}
                  >
                    {alertrisklevel.alertRskLevelName}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>

          <Row gutter={10} style={{ marginTop: 20 }}>
            <Col xs={12} md={12}>
              <LabelInput labelText={"Descripción"} nameInput={"description"} />
              <TextArea
                placeholder="Descripción"
                id="description"
                name="description"
                type="text"
                onChange={(event) => setAlertDescription(event.target.value)}
                value={description}
                rows={2}
              />
            </Col>

            <Col xs={12} md={12}>
              <LabelInput
                labelText={"Involucrados"}
                nameInput={"alertInvolved"}
              />
              {role?.map((tag) => (
                <CheckableTag
                  key={tag.person.persEmail}
                  checked={selectInvolved.indexOf(tag.person.persId) > -1}
                  onChange={(event) => handleChangeInvolved(tag, event)}
                >
                  {tag.person.persName}
                </CheckableTag>
              ))}
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
              onClick={SavePreAlert}
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </SectionTitle>
  );
};

export default CrearConfiguracionAlerta;
