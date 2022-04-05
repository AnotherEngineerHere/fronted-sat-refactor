import React, { useState } from "react";
import { useSelector } from "react-redux";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import { Table, Divider, Popconfirm, Row, Col, Select, Modal } from "antd";
import { secondaryColor } from "../../commons/constants/StylesConstants";
import { useFormik } from "formik";

import { Link } from "react-router-dom";

import { EditOutlined, DeleteOutlined, FormOutlined } from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";
import {
  useGetPreAlertQuery,
  useDeletePreAlertMutation,
  useUpdatePreAlertMutation,
  useGetAlertTypeQuery,
  useGetAlertRiskLevelQuery,
  useGetRoleQuery,
} from "../../redux/api/mainAPI";
import LabelInput from "../../components/LabelInput";
import { Option } from "antd/lib/mentions";
import TextArea from "antd/lib/input/TextArea";
import CheckableTag from "antd/lib/tag/CheckableTag";

/**
 * @name ConfiguracionAlerta
 * @returns La página que permite visualizar las alertas predefinidas.
 */
const ConfiguracionAlerta = () => {
  document.title = "Alerta";

  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";

  const userInfo = permisos.includes("ROLE_Directive-PreAlert")
    ? "directive"
    : permisos.includes("ROLE_Admin-PreAlert")
    ? "adm"
    : "";
  const [showModal, setShowModal] = useState(false);
  const [deletePreAlertReq, { isLoading: deleteLoading }] =
    useDeletePreAlertMutation();

  /**
   * Se encarga de eliminar una alerta predefinida teniendo en cuenta el identificador.
   * Este hace el llamado de la petición de DELETE de mainAPI.
   * @param {*} alertId
   */
  const deletePreAlert = async (alertId) => {
    await deletePreAlertReq({ alertId, userInfo });
  };

  /**
   * La variable @var prealertsData almacena las alertas predefinidas recuperadas.
   * Hace uso de la petición GET de mainAPI.
   */
  const {
    data: prealertsData,
    error: prealertsError,
    prealertsLoading,
  } = useGetPreAlertQuery();
  const prealerts = prealertsData;

  /**
   * Se encarga de actualizar un nivel de riesgo.
   * Este hace el llamado de la petición de PUT de mainAPI.
   */
  const [updatePreAlertReq, { isLoading: updateLoading }] =
    useUpdatePreAlertMutation();

  const [typeModal, setTypeModal] = useState("edit");

  const onShowModal = (type) => {
    setTypeModal("edit");
    setShowModal(true);
  };
  const onCancelModal = () => {
    setShowModal(false);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
      type: "",
    },

    onSubmit: async (values) => {
      /**
       * Se encarga de actualizar una alerta predefinida.
       * Este hace el llamado de la petición de PUT de mainAPI.
       * @param {*} preAlert
       */
      const preAlert = {
        alertId: values.alertId,
        alertType: values.alertType.alerttpId,
        alertRiskLevel: values.alertRiskLevel.alertRskLevelId,
        alertDescription: values.alertDescription,
      };
      await updatePreAlertReq({ preAlert });
    },
  });

  const [alertType, setAlertType] = useState();
  const [alertRiskLevel, setAlertRiskLevel] = useState();
  const [selectInvolved, setSelectedInvolved] = useState([99]);


  const handleChangeInvolved = (tag, checked) => {
    const selectInvolved1 = selectInvolved;
    const nextSelectedTags = checked
      ? [...selectInvolved1, tag.person.persId]
      : selectInvolved1.filter((t) => t !== tag.person.persId);
    console.log("You are interested in: ", nextSelectedTags);
    setSelectedInvolved(nextSelectedTags);
  };

  const handleChangeAlertType = (value) => {
    setAlertType(value);
  };
  const handleChangeAlertRiskLevel = (value) => {
    setAlertRiskLevel(value);
  };
  /**
   * La variable @var alerttypeData almacena los tipos de alerta recuperados.
   * Hace uso de la petición GET de mainAPI.
   */
  const {
    data: alerttypeData,
    error: alerttypeError,
    alerttypeLoading,
  } = useGetAlertTypeQuery();
  /**
   * La variable @var alertriskData almacena los niveles de riesgo recuperados.
   * Hace uso de la petición GET de mainAPI.
   */
  const {
    data: alertriskData,
    error: alertriskError,
    alertriskLoading,
  } = useGetAlertRiskLevelQuery();

  /**
   * La variable @var roleData almacena los roles recuperados.
   * Hace uso de la petición GET de mainAPI.
   */
  const { data: roleData, error: roleError, roleLoading } = useGetRoleQuery();

  const role = roleData;

  const formPreAlert = (
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
            <LabelInput labelText={"Tipo de alerta"} nameInput={"alertType"} />
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Tipo de alerta"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
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
              onChange={formik.handleChange}
              value={formik.values.alertDescription}
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
            onClick={typeModal === "create" ? `Crear` : `Editar`}
          >
            Editar
          </button>
        </div>
      </form>
    </div>
  );
/**
   * Representa las columnas de la tabla.
   * Recordar que @var dataIndex y @var key deben coincidir con el nombre que se le da al atributo en las clases del backend.
   */
  const columns = [
    {
      title: "ID",
      dataIndex: "alertId",
      key: "alertId",
    },
    {
      title: "Tipo de alerta",
      dataIndex: "alertType",
      key: "alertType",
      render: (alertType) => <>{alertType.alerttpName}</>,
    },
    {
      title: "Nivel de riesgo",
      dataIndex: "alertRiskLevel",
      key: "alertRiskLevel",
      render: (alertRiskLevel) => <>{alertRiskLevel.alertRskLevelName}</>,
    },
    {
      title: "Descripción",
      dataIndex: "alertDescription",
      key: "alertDescription",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return (
          <span>
            <Link to={`/editar/servicio/${record.id}`}>
              <EditOutlined style={{ color: primaryColor, fontSize: 20 }} />
            </Link>
            <Divider type="vertical" />
            <div>
              <Popconfirm
                placement="bottom"
                title={`¿Deseas eliminar este elemento #${record.alertId}?`}
                onConfirm={() => deletePreAlert(record.alertId)}
                okText="Si"
                cancelText="No"
              >
                <DeleteOutlined
                  style={{ color: primaryColor, fontSize: 20, marginTop: 3 }}
                />
              </Popconfirm>
            </div>
          </span>
        );
      },
    },
  ];

  return (
    <SectionTitle title={"Configuración de alertas"}>
      <Link to={`/config-pre-alerts`}>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 15,
          }}
        >
          <button
            style={{
              backgroundColor: secondaryColor,
              color: "white",
              borderColor: secondaryColor,
              height: "30px",
              width: "100px",
              borderRadius: "3px",
            }}
            type="submit"
          >
            {<FormOutlined />} Nuevo
          </button>
        </div>
      </Link>
      <Table dataSource={prealerts} rowKey="alertId" columns={columns} />
      <Modal
        title="Editar Tipo de alerta"
        visible={showModal}
        onOk={() => {}}
        onCancel={onCancelModal}
        footer={null}
      >
        {formPreAlert}
      </Modal>
    </SectionTitle>
  );
};
export default ConfiguracionAlerta;
