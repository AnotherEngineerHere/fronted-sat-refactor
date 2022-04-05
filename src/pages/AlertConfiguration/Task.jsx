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
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { DatePicker, Input, TimePicker } from "antd";
import { primaryColor } from "../../commons/constants/StylesConstants";
import moment from "moment";
import { useFormik } from "formik";
import { useSelector } from "react-redux";
import LabelInput from "../../components/LabelInput";
import {
  useCreateTaskMutation,
  useDeleteTaskMutation,
  useGetAutomaticAlertsQuery,
  useGetTasksQuery,
  useGetTasksTypeQuery,
  useUpdateTaskMutation,
} from "../../redux/api/mainAPI";
import "./Precondition.css";
const { Option } = Select;
const children = [];
for (let i = 10; i < 36; i++) {
  children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

const dateFormat = "YYYY/MM/DD";
const Task = () => {
  document.title = "Tareas";
  const [showModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(0);
  const [typeModal, setTypeModal] = useState("");

  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";
  // const userInfo = 'directive';
  const userInfo = permisos.includes("ROLE_Directive-Task")
    ? "directive"
    : permisos.includes("ROLE_Admin-Task")
    ? "adm"
    : "";
  const {
    data: dataSource,
    error: requestError,
    requestLoading,
  } = useGetTasksQuery(userInfo);
  const {
    data: taskTypeData,
    error: taskTypeError,
    taskTypeLoading,
  } = useGetTasksTypeQuery(userInfo);
  const {
    data: autoAlertsData,
    error: autoAlertsError
  } = useGetAutomaticAlertsQuery(userInfo);
  const [createTaskReq, { isLoading: createLoding }] = useCreateTaskMutation();
  const [updateTaskReq, { isLoading: updateLoding }] = useUpdateTaskMutation();
  const [deleteTaskReq, { isLoading: deleteLoding }] = useDeleteTaskMutation();
  console.log(dataSource);
  const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
      type: "",
    },
    onSubmit: async (values) => {
      if (values.typeForm === "create") {
        const taskToAdd = {
          taskDate: values.taskDate,
          taskFrecuency: values.taskFrecuency,
          taskTime: values.taskTime,
          taskTypeId: parseInt(values.taskType),
          automaticAlerts: values.automaticAlerts
        };
        await createTaskReq({ userInfo, taskToAdd });
      } else {
        const taskToEdit = {
          taskId: itemSelected,
          taskDate: values.taskDate,
          taskFrecuency: values.taskFrecuency,
          taskTime: values.taskTime,
          taskTypeId: values.taskType,
          automaticAlerts: values.automaticAlerts
        };
        await updateTaskReq({ userInfo, taskToEdit });
      }
    },
  });
  const deleteTask = async (taskId) => {
    await deleteTaskReq({ taskId, userInfo });
  };
  const onShowModal = (type) => {
    setTypeModal(type);
    formik.setFieldValue("typeForm", type);
    setShowModal(true);
  };
  function onChangeDate(date, dateString) {
    formik.setFieldValue("taskDate", dateString);
    console.log(date, dateString);
  }
  function onTimechange(time, timeString) {
    formik.setFieldValue("taskTime", timeString);
    console.log(time, timeString);
  }
  function autoAlertsHandlechange(value) {
    let autoAlerts = [];
      value.forEach(autoId => autoAlerts.push(autoAlertsData.find(autoAlert => autoAlert.autoalertId===parseInt(autoId))));
        formik.setFieldValue("automaticAlerts",autoAlerts);
  }
  function taskTypeHandleChange(value) {
    formik.setFieldValue("taskType", value);
  }

  const onCancelModal = () => {
    setShowModal(false);
  };
  const setForkiFields = (values, from) => {
    if (from === "create") {
      formik.setFieldValue("taskDate", "2021/12/20");
      formik.setFieldValue("taskFrecuency", "");
      formik.setFieldValue("taskTime", "00:00:00");
      formik.setFieldValue("taskTypeId", "");
    } else if (from === "edit") {
      formik.setFieldValue("taskDate", values.taskDate);
      formik.setFieldValue("taskFrecuency", values.taskFrecuency);
      formik.setFieldValue("taskTime", values.taskTime);
      formik.setFieldValue("taskTypeId", values.taskTypeId);
    }
  };
  const formPrecondition = (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row gutter={10}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Fecha"} nameInput={"taskDate"} />
            <DatePicker
              onChange={onChangeDate}
              value={moment(formik.values.taskDate, dateFormat)}
            />
          </Col>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Frecunecia"} nameInput={"taskFrecuency"} />
            <Input
              placeholder=""
              name="taskFrecuency"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.taskFrecuency}
            />
          </Col>
        </Row>
        <Row gutter={10} style={{ marginTop: 20 }}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Hora"} nameInput={"taskTime"} />
            <TimePicker
              onChange={onTimechange}
              value={moment(formik.values.taskTime, "HH:mm:ss")}
            />
            ,
          </Col>

          <Col xs={12} md={12}>
            <LabelInput
              labelText={"Alertas automáticas"}
              nameInput={"automaticAlerts"}
            />
            <Select
              mode="multiple"
              allowClear
              style={{ width: "100%" }}
              placeholder="Please select"
              onChange={autoAlertsHandlechange}
            >
              {autoAlertsData&&autoAlertsData.map(autoAlert => (
                  <Option key={autoAlert.autoalertId}>{autoAlert.autoalertName}</Option>
                ))}
            </Select>
          </Col>
        </Row>
        <Row gutter={10} style={{ marginTop: 20 }}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Tipo de tarea"} nameInput={"taskType"} />
            <Select
              style={{ width: "100%" }}
              placeholder="Please select"
              value={formik.values.taskType}
              onChange={taskTypeHandleChange}
            >
              {taskTypeData &&
                taskTypeData.map((type) => (
                  <Option key={type.taskTypeId}>{type.tsktypeName}</Option>
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
      dataIndex: "taskId",
      key: "taskId",
    },
    {
      title: "Fecha",
      dataIndex: "taskDate",
      key: "taskDate",
    },
    {
      title: "Frecuencia",
      dataIndex: "taskFrecuency",
      key: "taskFrecuency",
    },
    {
      title: "Tiempo",
      dataIndex: "taskTime",
      key: "taskTime",
    },
    {
      title: "Alertas automáticas",
      dataIndex: "autoAlerts",
      key: "autoAlerts",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
            <div>
              <Link to={`/task/autoalerts/${record.taskId}`}>
                Ver alertas automáticas
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
                  setForkiFields(record, "edit");
                  setItemSelected(record.taskId);
                  onShowModal("edit");
                }}
              />
            </div>
            <Divider type="vertical" style={{ marginTop: 8 }} />
            <div>
              <Popconfirm
                placement="bottom"
                title={`Deseas eliminar este elemento #${record.taskId}`}
                onConfirm={() => deleteTask(record.taskId)}
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
    <SectionTitle title={"Tareas"}>
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
          Crear Tarea
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />

      <Modal
        title={
          typeModal === "create"
            ? `Crear Tarea`
            : `Editar Tarea # ${itemSelected}`
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
export default Task;
