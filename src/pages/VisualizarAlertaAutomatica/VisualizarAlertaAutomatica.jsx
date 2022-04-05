import React from "react";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import { Table, Divider } from "antd";
import { secondaryColor } from "../../commons/constants/StylesConstants";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";
import {
  useGetAutoAlertsQuery,
  useGetTasksQuery,
} from "../../redux/api/mainAPI";

/**
 * @name VisualizarAlertaAutomatica
 * @returns La página que permite visualizar las alertas automáticas.
 */
const VisualizarAlertaAutomatica = () => {
  document.title = "Alertas automáticas";

  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";

  const userInfo = permisos.includes("ROLE_Directive-AutoAlert")
    ? "directive"
    : permisos.includes("ROLE_Admin-AutoAlert")
    ? "adm"
    : "";
  /**
   * La variable @var autoalertsData almacena las alertas automáticas.
   */
  const {
    data: autoalertsData,
  } = useGetAutoAlertsQuery(userInfo);

  const autoalerts = autoalertsData;

  /**
   * La variable @var taskautoalertsData almacena las tareas.
   */
  const {
    data: taskautoalertsData,
  } = useGetTasksQuery; //(userInfo);



  /**
   * Representa las columnas de la tabla.
   * Recordar que @var dataIndex y @var key deben coincidir con el nombre que se le da al atributo en las clases del backend.
   */
  const columns = [
    {
      title: "ID",
      dataIndex: "autoalertId",
      key: "autoalertId",
    },
    {
      title: "Nombre",
      dataIndex: "autoalertName",
      key: "autoalertName",
    },
    {
      title: "Tipo de alerta",
      dataIndex: "alertType",
      key: "alertType",
    },
    {
      title: "Nivel de riesgo",
      dataIndex: "altRskLvlAlertRskLevelId",
      key: "altRskLvlAlertRskLevelId",
    },
    {
      title: "Descripción",
      dataIndex: "autoalertDescription",
      key: "autoalertDescription",
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
            <Link to={`/editar/servicio/${record.id}`}>
              <DeleteOutlined style={{ color: primaryColor, fontSize: 20 }} />
            </Link>
          </span>
        );
      },
    },
  ];

  return (
    <SectionTitle title={"Alertas automáticas"}>
      <Link to={`/visualize-auto-alerts`}>
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
            {<DownloadOutlined />} Descargar
          </button>
        </div>
      </Link>
      <Table dataSource={autoalerts} rowKey="autoalertId" columns={columns} />
    </SectionTitle>
  );
};
export default VisualizarAlertaAutomatica;
