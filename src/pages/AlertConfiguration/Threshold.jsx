import React, { useState } from "react";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import {
  Table,
  Divider,
  Select,
  Button,
  Modal,
  Col,
  Input,
  Row,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";
import { useFormik } from "formik";
import LabelInput from "../../components/LabelInput";
import { useSelector } from "react-redux";
import {
  useDeleteThresholdMutation,
  useGetThresholdsQuery,
  usePostThresholdMutation,
  useUpdateThresholdMutation,
} from "../../redux/api/mainAPI";
import "./Threshold.css";
const { Option } = Select;
const valueTypeData = [
  { title: "Cadena", symbol: "S" },
  { title: "Número", symbol: "N" },
  { title: "Objeto", symbol: "O" },
];

const Threshold = () => {
  document.title = "Threshold";
  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";
  // const userInfo = 'directive';
  const userInfo = permisos.includes("ROLE_Directive-Threshold")
    ? "directive"
    : permisos.includes("ROLE_Admin-Threshold")
    ? "adm"
    : "";
  const [showModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(0);
  const [typeModal, setTypeModal] = useState("");
  const {
    data: dataSource,
    error: requestError,
    requestLoading,
  } = useGetThresholdsQuery(userInfo);
  const [createThreshold, { isLoading: createLoding }] =
    usePostThresholdMutation();
  const [updateThreshold, { isLoading: updateLoading }] =
    useUpdateThresholdMutation();
  const [deleteThresholdReq, { isLoading: deleteLoading }] =
    useDeleteThresholdMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
      type: "",
    },
    onSubmit: async (values) => {
      if (values.typeForm === "create") {
        const thresholdToAdd = {
          thresholdName: values.thresholdName,
          thresholdValue: values.thresholdValue,
          thresholdValueType: values.thresholdValueType,
        };
        await createThreshold({ userInfo, thresholdToAdd });
      } else {
        const thresholdToEdit = {
          thresholdName: values.thresholdName,
          thresholdValue: values.thresholdValue,
          thresholdValueType: values.thresholdValueType,
          thresholdId: itemSelected,
        };
        await updateThreshold({ userInfo, thresholdToEdit });
      }
    },
  });

  const deleteThreshold = async (thresholdId) => {
    await deleteThresholdReq({ thresholdId, userInfo });
  };
  const onShowModal = (type) => {
    setTypeModal(type);
    formik.setFieldValue("typeForm", type);
    setShowModal(true);
  };
  const setForkiFields = (values, from) => {
    if (from === "create") {
      formik.setFieldValue("thresholdName", "");
      formik.setFieldValue("thresholdValue", "");
      formik.setFieldValue("thresholdValueType", "");
    } else if (from === "edit") {
      formik.setFieldValue("thresholdName", values.thresholdName);
      formik.setFieldValue("thresholdValue", values.thresholdValue);
      formik.setFieldValue("thresholdValueType", values.thresholdValueType);
    }
  };
  const valueTypeHandleChange = (value) => {
    formik.setFieldValue("thresholdValueType", value);
  };
  const onCancelModal = () => {
    setShowModal(false);
  };

  const formThreshold = (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row gutter={10}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Nombre"} nameInput={"thresholdName"} />
            <Input
              placeholder=""
              name="thresholdName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.thresholdName}
            />
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>

          <Col xs={12} md={12}>
            <LabelInput labelText={"Valor"} nameInput={"thresholdValue "} />
            <Input
              placeholder=""
              name="thresholdValue"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.thresholdValue}
            />
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>
        </Row>

        <Row gutter={10} style={{ marginTop: 20 }}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Tipo"} nameInput={"thresholdValueType"} />
            <Select
              className="ant-select-selection"
              defaultValue="N"
              value={formik.values.thresholdValueType}
              onChange={valueTypeHandleChange}
            >
              {valueTypeData.map((valType) => (
                <Option key={valType.symbol}>{valType.title}</Option>
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
      dataIndex: "thresholdId",
      key: "thresholdId",
    },
    {
      title: "Nombre",
      dataIndex: "thresholdName",
      key: "thresholdName",
    },
    {
      title: "Valor",
      dataIndex: "thresholdValue",
      key: "thresholdValue",
    },
    {
      title: "Tipo",
      dataIndex: "thresholdValueType",
      key: "thresholdValueType",
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
                  setForkiFields(record, "edit");
                  setItemSelected(record.thresholdId);
                  onShowModal("edit");
                }}
              />
            </div>
            <Divider type="vertical" style={{ marginTop: 8 }} />
            <div>
              <Popconfirm
                placement="bottom"
                title={`Deseas eliminar este elemento #${record.thresholdId}`}
                onConfirm={() => {
                  deleteThreshold(record.thresholdId);
                }}
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
    <SectionTitle title={"Threshold"}>
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
            setForkiFields("", "create");
            onShowModal("create");
          }}
        >
          Crear Threshold
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />

      <Modal
        title={
          typeModal === "create"
            ? `Crear Threshold`
            : `Editar Threshold # ${itemSelected}`
        }
        visible={showModal}
        onOk={() => {}}
        onCancel={onCancelModal}
        footer={null}
      >
        {formThreshold}
      </Modal>
    </SectionTitle>
  );
};
export default Threshold;
