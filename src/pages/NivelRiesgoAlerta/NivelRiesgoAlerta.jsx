import React, { useState } from "react";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import { Table, Divider, Popconfirm } from "antd";
import { secondaryColor } from "../../commons/constants/StylesConstants";
import {
  useGetAlertRiskLevelQuery,
  useDeleteAlertRiskLevelMutation,
  useUpdateAlertRiskLevelMutation,
} from "../../redux/api/mainAPI";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { useSelector } from "react-redux";

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  FormOutlined,
} from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";

/**
 * @name NivelRiesgoAlerta
 * @returns La página que permite visualizar los Niveles de riesgo.
 */
const NivelRiesgoAlerta = () => {
  document.title = "Nivel de riesgo";
  const [showModal, setShowModal] = useState(false);

  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";

  const userInfo = permisos.includes("ROLE_Directive-AlertRiskLevel")
    ? "directive"
    : permisos.includes("ROLE_Admin-AlertRiskLevel")
    ? "adm"
    : "";

  const [deleteAlertRiskLevelReq, { isLoading: deleteLoading }] =
    useDeleteAlertRiskLevelMutation();

  /**
   * Se encarga de eliminar un nivel de riesgo teniendo en cuenta el identificador.
   * Este hace el llamado de la petición de DELETE de mainAPI.
   * @param {*} alertRskLevelId
   */
  const deleteAlertRiskLevel = async (alertRskLevelId) => {
    await deleteAlertRiskLevelReq({ alertRskLevelId, userInfo });
  };

  const [updateAlertRiskLevelReq, { isLoading: updateLoading }] =
    useUpdateAlertRiskLevelMutation();

  /**
   * La variable @var alertrisklevelData almacena los niveles de riesgo recuperados.
   * Hace uso de la petición GET de mainAPI.
   */
  const {
    data: alertrisklevelData,
    error: alertrisklevelError,
    alertrisklevelLoading,
  } = useGetAlertRiskLevelQuery();

  const alertrisklevel = alertrisklevelData;

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

    /**
     * Se ejecuta al momento de presionar el botón de crear.
     * @param {*} values 
     */
    onSubmit: async (values) => {
      /**
       * Se encarga de actualizar un nivel de riesgo.
       * Este hace el llamado de la petición de PUT de mainAPI.
       * @param {*} alertRiskLevel
       */
      const alertRiskLevel = {
        alertRskLevelName: values.alertRskLevelName,
      };
      await updateAlertRiskLevelReq({ alertRiskLevel });
    },
  });

  /**
   * Representa las columnas de la tabla.
   * Recordar que @var dataIndex y @var key deben coincidir con el nombre que se le da al atributo en las clases del backend.
   */
  const columns = [
    {
      title: "ID",
      dataIndex: "alertRskLevelId",
      key: "alertRskLevelId",
    },
    {
      title: "Nombre",
      dataIndex: "alertRskLevelName",
      key: "alertRskLevelName",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return (
          <span>
            <Link to={`/servicio/${record.id}`}>
              <EyeOutlined style={{ color: primaryColor, fontSize: 20 }} />
            </Link>
            <Divider type="vertical" />
            <Link to={`/editar/servicio/${record.id}`}>
              <EditOutlined style={{ color: primaryColor, fontSize: 20 }} />
            </Link>
            <Divider type="vertical" />
            <div>
              <Popconfirm
                placement="bottom"
                title={`¿Deseas eliminar este elemento #${record.alertRskLevelId}?`}
                onConfirm={() => deleteAlertRiskLevel(record.alertRskLevelId)}
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
    <SectionTitle title={"Niveles de riesgo"}>
      <Link to={`/config-alerts-risk`}>
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

      <Table
        dataSource={alertrisklevel}
        rowKey="alertRskLevelId"
        columns={columns}
      />
    </SectionTitle>
  );
};
export default NivelRiesgoAlerta;
