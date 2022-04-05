import React, { useState } from "react";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import {
  Table,
  Divider,
  Select,
  Button,
  Modal,
  Col,
  Row,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";
import { useFormik } from "formik";
import { Link } from "react-router-dom";
import LabelInput from "../../components/LabelInput";
import { useSelector } from "react-redux";
import {
  useCreatePreconditionMutation,
  useDeletePreconditionMutation,
  useGetPreconditionsQuery,
  useUpdatePreconditionMutation,
} from "../../redux/api/mainAPI";
import "./Precondition.css";
const { Option } = Select;
const operators = ["OR", "AND"];
const Precondition = () => {
  document.title = "Precondición";
  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";
  // const userInfo = 'directive';
  const userInfo = permisos.includes("ROLE_Directive-Local-Condition")
    ? "directive"
    : permisos.includes("ROLE_Admin-Local-Condition")
    ? "adm"
    : "";
  const [showModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(0);
  const [typeModal, setTypeModal] = useState("");
  const {
    data: dataSource,
    error: requestError,
    requestLoading,
  } = useGetPreconditionsQuery(userInfo);
  const [createPreconditionReq, { isLoading: createLoding }] =
    useCreatePreconditionMutation();
  const [updatePreconditionReq, { isLoading: updateLoding }] =
    useUpdatePreconditionMutation();
  const [deletePreconditionReq, { isLoading: deleteLoding }] =
    useDeletePreconditionMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
      type: "",
    },
    onSubmit: async (values) => {
      if (values.typeForm === "create") {
        const preconditionToAdd = {
          preconLogicaloperand: values.preconLogicaloperand,
        };
        await createPreconditionReq({ userInfo, preconditionToAdd });
      } else {
        const preconditionToEdit = {
          preconId: itemSelected,
          preconLogicaloperand: values.preconLogicaloperand,
        };
        await updatePreconditionReq({ userInfo, preconditionToEdit });
      }
    },
  });
  const deletePrecondition = async (precondId) => {
    await deletePreconditionReq({ precondId, userInfo });
  };
  const onShowModal = (type) => {
    setTypeModal(type);
    formik.setFieldValue("typeForm", type);
    setShowModal(true);
  };
  const logOperHandlechange = (value) => {
    formik.values.preconLogicaloperand = value;
  };
  const onCancelModal = () => {
    setShowModal(false);
  };

  const formPrecondition = (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row gutter={10}>
          <Col xs={12} md={12}>
            <LabelInput
              labelText={"Operador lógico"}
              nameInput={"preconLogicaloperand"}
            />
            <Select
              className="ant-select-selection"
              // value={formik.values.preconLogicaloperand}
              onChange={logOperHandlechange}
            >
              {operators.map((operator) => (
                <Option key={operator}>{operator}</Option>
              ))}
            </Select>
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
          <Button htmlType="submit" type="primary">
            {typeModal === "create" ? `Crear` : `Editar`}
          </Button>
        </div>
      </form>
    </div>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "preconId",
      key: "preconId",
    },
    {
      title: "Operando lógico",
      dataIndex: "preconLogicaloperand",
      key: "preconLogicaloperand",
    },
    {
      title: "Condiciones locales",
      dataIndex: "localConditions",
      key: "localConditions",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Link to={`/precondition/localconditions/${record.preconId}`}>
                Ver condiciones locales
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      title: "Condiciones remotas",
      dataIndex: "remoteConditions",
      key: "remoteConditions",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Link to={`/precondition/remoteconditions/${record.preconId}`}>
                Ver condiciones remotas
              </Link>
            </div>
          </div>
        );
      },
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      key: "actions",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <EditOutlined
                style={{ color: primaryColor, fontSize: 20, marginTop: 3 }}
                onClick={() => {
                  formik.setFieldValue(
                    "preconLogicaloperand",
                    record.preconLogicaloperand
                  );
                  setItemSelected(record.preconId);
                  onShowModal("edit");
                }}
              />
            </div>
            <Divider type="vertical" style={{ marginTop: 8 }} />
            <div>
              <Popconfirm
                placement="bottom"
                title={`Deseas eliminar este elemento #${record.preconId}`}
                onConfirm={() => deletePrecondition(record.preconId)}
                okText="Si"
                cancelText="No"
              >
                <DeleteOutlined
                  style={{ color: primaryColor, fontSize: 20, marginTop: 3 }}
                />
              </Popconfirm>
            </div>
          </div>
        );
      },
    },
  ];

  return (
    <SectionTitle title={"Precondiciones"}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
        <Button
          style={{ borderRadius: 5 }}
          type="primary"
          ghost
          size="large"
          onClick={() => {
            onShowModal("create");
          }}
        >
          Crear Precondición
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />

      <Modal
        title={
          typeModal === "create"
            ? `Crear Precondición`
            : `Editar Precondición # ${itemSelected}`
        }
        visible={showModal}
        onOk={() => {}}
        onCancel={onCancelModal}
        footer={null}
      >
        {formPrecondition}
      </Modal>
    </SectionTitle>
  );
};
export default Precondition;
