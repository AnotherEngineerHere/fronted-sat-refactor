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
  Input,
  Tag
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import LabelInput from "../../components/LabelInput";
import {
    useUpdateTriggerMutation,
  useDeleteTriggerMutation,
  useGetTriggersQuery,
  useCreateTriggerMutation,
  useGetTriggerTypeQuery
} from "../../redux/api/mainAPI";
import "./Precondition.css";
const { Option } = Select;


const Trigger = () => {
  document.title = "Tareas";
  const [showModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(0);
  const [typeModal, setTypeModal] = useState("");

  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";
  // const userInfo = 'directive';
  const userInfo = permisos.includes("ROLE_Directive-Triggerr")
    ? "directive"
    : permisos.includes("ROLE_Admin-Triggerr")
    ? "adm"
    : "";
  const {
    data: dataSource,
    error: requestError,
    requestLoading,
  } = useGetTriggersQuery(userInfo);
  const {
    data: trigerTypeData,
    error: triggerTypeError
  } = useGetTriggerTypeQuery(userInfo);
  const [createTriggerReq, { isLoading: createLoding }] = useCreateTriggerMutation();
  const [updateTriggerReq, { isLoading: updateLoding }] = useUpdateTriggerMutation();
  const [deleteTriggerReq, { isLoading: deleteLoding }] = useDeleteTriggerMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
      type: "",
    },
    onSubmit: async (values) => {
      if (values.typeForm === "create") {
        const triggerToAdd = {
          trgDescription: values.trgDescription,
          trgName: values.trgName,
          trgScope: values.trgScope,
          triggerType: values.triggerType,
        };
        console.log(triggerToAdd);
            await createTriggerReq({ userInfo, triggerToAdd });
      } else {
        const triggerToEdit = {
         trgId: itemSelected,
          trgDescription: values.trgDescription,
          trgName: values.trgName,
          trgScope: values.trgScope,
          triggerType: values.triggerType,
        };
        await updateTriggerReq({ userInfo, triggerToEdit });
      }
    },
  });
  const deleteTrigger = async (triggerId) => {
    await deleteTriggerReq({ triggerId, userInfo });
  };
  const onShowModal = (type) => {
    setTypeModal(type);
    formik.setFieldValue("typeForm", type);
    setShowModal(true);
  };

  function triggerTypeHandleChange(value) {
    let triggertype=  trigerTypeData.find(type => type.trgtypeId===parseInt(value));
    formik.setFieldValue("triggerType", triggertype);
  }

  const onCancelModal = () => {
    setShowModal(false);
  };
  const setForkiFields = (values, from) => {
    if (from === "create") {
      formik.setFieldValue("trgDescription", "");
      formik.setFieldValue("trgName", "");
      formik.setFieldValue("trgScope", "");
    } else if (from === "edit") {
      formik.setFieldValue("trgDescription", values.trgDescription);
      formik.setFieldValue("trgName", values.trgName);
      formik.setFieldValue("trgScope", values.trgScope);
    }
  };
  const formPrecondition = (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row gutter={10}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Nombre"} nameInput={"trgName"} />
            <Input
              placeholder=""
              name="trgName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.trgName}
            />
          </Col>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Descripción"} nameInput={"trgDescription"} />
            <Input
              placeholder=""
              name="trgDescription"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.trgDescription}
            />
          </Col>
        </Row>
        <Row gutter={10} style={{ marginTop: 20 }}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Alcance"} nameInput={"trgScope"} />
            <Input
              placeholder=""
              name="trgScope"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.trgScope}
            />
            ,
          </Col>

          <Col xs={12} md={12}>
            <LabelInput labelText={"Tipo de trigger"} nameInput={"triggerType"} />
            <Select
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={triggerTypeHandleChange}
            >
              {trigerTypeData &&
                trigerTypeData.map((type) => (
                  <Option key={type.trgtypeId}>{type.trgtypeName}</Option>
                ))}
            </Select>
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
      dataIndex: "trgId",
      key: "trgId",
    },
    {
      title: "Nombre",
      dataIndex: "trgName",
      key: "trgName",
    },
    {
      title: "Descripción",
      dataIndex: "trgDescription",
      key: "trgDescription",
    },
    {
      title: "Alcance",
      dataIndex: "trgScope",
      key: "trgScope",
    },
    {
      title: "Tipo",
      dataIndex: "triggerType",
      key: "triggerType",
      render: (triggerType) => (
        <>
            { <Tag color={triggerType.trgtypeId===1?"red":triggerType.trgtypeId===2? "yellow": "geekblue"} key={triggerType.trgtypeId}>
                {triggerType.trgtypeName.toUpperCase()}
            </Tag>  
            }   
        </>
        ),
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
                  setItemSelected(record.trgId);
                  onShowModal("edit");
                }}
              />
            </div>
            <Divider type="vertical" style={{ marginTop: 8 }} />
            <div>
              <Popconfirm
                placement="bottom"
                title={`Deseas eliminar este elemento #${record.trgId}`}
                onConfirm={() => deleteTrigger(record.trgId)}
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
    <SectionTitle title={"Triggers"}>
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
          Crear Trigger
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />

      <Modal
        title={
          typeModal === "create"
            ? `Crear Trigger`
            : `Editar Trigger # ${itemSelected}`
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
export default Trigger;
