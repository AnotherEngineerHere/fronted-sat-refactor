import React, { useState } from "react";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import { Table, Divider, Popconfirm, Row, Col, Input, Modal } from "antd";
import { secondaryColor } from "../../commons/constants/StylesConstants";
import { useFormik } from "formik";

import { Link } from "react-router-dom";

import { FormOutlined } from "@ant-design/icons";

import { useSelector } from "react-redux";
import {EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";
import {
  useGetAlertTypeQuery,
  useDeleteAlertTypeMutation,
  useUpdateAlertTypeMutation,
} from "../../redux/api/mainAPI";
import LabelInput from "../../components/LabelInput";

/**
 * @name TiposAlerta
 * @returns La página que permite visualizar los tipos de alerta.
 */
const TiposAlerta = () => {
  document.title = "Tipos de alerta";

  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";

  const userInfo = permisos.includes("ROLE_Directive-AlertType")
    ? "directive"
    : permisos.includes("ROLE_Admin-AlertType")
    ? "adm"
    : "";
  /**
   * La variable @var alertTypeData almacena los tipos de alerta recuperados.
   * Hace uso de la petición GET de mainAPI.
   */
  const {
    data: alertTypeData,
  } = useGetAlertTypeQuery(userInfo);

  const alertypes = alertTypeData;
  const [showModal, setShowModal] = useState(false);
  const [deleteAlertTypeReq] =
    useDeleteAlertTypeMutation();

  /**
   * Se encarga de eliminar un tipo de alerta teniendo en cuenta el identificador.
   * Este hace el llamado de la petición de DELETE de mainAPI.
   * @param {*} alerttpId
   */
  const deleteAlertType = async (alerttpId) => {
    await deleteAlertTypeReq({ alerttpId, userInfo });
  };

  const [updateAlertTypeReq] =
    useUpdateAlertTypeMutation();

  const [typeModal, setTypeModal] = useState("edit");

  const onShowModal = () => {
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
       * Se encarga de actualizar un tipo de alerta.
       * Este hace el llamado de la petición de UPDATE de mainAPI.
       * @param {*} alertType
       */
      const alertType = {
        alerttpName: values.alerttpName,
      };
      await updateAlertTypeReq({ alertType });
    },
  });

  /**
   * Renderiza la página para visualizar los tipos de alerta.
   */
  const formAlertType = (
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
            onChange={formik.handleChange}
            value={formik.values.alerttpName}
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
          onClick={typeModal === "create" ? `Crear` : `Editar`}
        >
          Editar
        </button>
      </div>
    </div>
  );

  /**
   * Representa las columnas de la tabla.
   * Recordar que @var dataIndex y @var key deben coincidir con el nombre que se le da al atributo en las clases del backend.
   */
  const columns = [
    {
      title: "ID",
      dataIndex: "alerttpId",
      key: "alerttpId",
    },
    {
      title: "Nombre",
      dataIndex: "alerttpName",
      key: "alerttpName",
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return (
          <span>
            <Divider type="vertical" />

            <EditOutlined
              style={{ color: primaryColor, fontSize: 20 }}
              onClick={() => {
                onShowModal("edit");
              }}
            />
            <Divider type="vertical" />
            <div>
              <Popconfirm
                placement="bottom"
                title={`¿Deseas eliminar este elemento #${record.alertTypeId}?`}
                onConfirm={() => deleteAlertType(record.alertTypeId)}
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
    <SectionTitle title={"Tipos de Alerta"}>
      <Link to={`/config-alerts-type`}>
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
      <Table dataSource={alertypes} columns={columns} />
      <Modal
        title="Editar Tipo de alerta"
        visible={showModal}
        onOk={() => {}}
        onCancel={onCancelModal}
        footer={null}
      >
        {formAlertType}
      </Modal>
    </SectionTitle>
  );
};
export default TiposAlerta;
