import React, { useState } from "react";
import "./AppointmentsContainer.css";
import { Table, Button, Select, Input, Tag,  Modal } from "antd";
import {
  useGetAppointmentsByPersonQuery,
  useGetSupportCenterQuery,
  usePostAppointmentMutation,
} from "../../redux/api/mainAPI";
import { useSelector } from "react-redux";

const AppointmentsContainer = () => {
  const { user } = useSelector((state) => state.userLogin);
  //console.log(user.userrId);
  //const { token } = useSelector((state) => state.tokenAuth);
  // const configurated = {
  //   headers: { Authorization: `Bearer ${token}` },
  // };
  //console.log(token);
  //console.log(token);

  //console.log(user);

  const { Option } = Select;
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
    saveAppointment();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const [appointmentDays, setAppointmentDays] = React.useState(null);

  const handleVariable = (event) => {
    setAppointmentDays({
      ...appointmentDays,
      [event.target.id]: event.target.value,
    });
  };

  const [reasonAppointment, setReasonAppointment] = useState("");
  const [supportCenter, setSupportCenter] = useState();
  const [createAppointment] = usePostAppointmentMutation();

  const { data: supportCenterData } = useGetSupportCenterQuery();
  const { data: appointmentsData } = useGetAppointmentsByPersonQuery(
    user?.userrId
  );

  /** 
  useEffect(() => {
    axios
      .get("/appointment/findByPerson?personId=1", configurated)
      .then((res) => {
        console.log(res);
        console.log(configurated);
      });
  }, []);
  */

  const appointments = appointmentsData;

  const columns = [
    {
      title: "ID",
      dataIndex: "appointmentId",
      key: "appointmentId",
    },
    {
      title: "Centro de apoyo",
      dataIndex: "supportcenter",
      key: "supportcenter",
      render: (supportcenter) => <>{supportcenter?.supcenName}</>,
    },
    {
      title: "Observación",
      dataIndex: "appointmentComment",
      key: "appointmentComment",
    },
    {
      title: "Estado",
      dataIndex: "appointmentState",
      key: "appointmentState",
      render: (stateAppointment) =>
        stateAppointment === "Y" ? (
          <Tag color={"green"} key={stateAppointment}>
            Asignada
          </Tag>
        ) : (
          <Tag color={"red"} key={stateAppointment}>
            Pendiente
          </Tag>
        ),
    },
    {
      title: "Modalidad",
      dataIndex: "appointmentModality",
      key: "appointmentModality",
      render: (appointmentModality) =>
        appointmentModality === "P" ? "Presencial " : "Virtual",
    },
    {
      title: "Lugar",
      dataIndex: "appointmentPlace",
      key: "appointmentPlace",
    },
    {
      title: "Fecha",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
    },
  ];

  const saveAppointment = async () => {
    const newAppointment = {
      appointmentObservation: reasonAppointment,
      appointmentState: "N",
      appointmentComment:
        "Lunes: " +
        appointmentDays.mondaySchedule +
        ", " +
        "Martes: " +
        appointmentDays.tuesdaySchedule +
        ", " +
        "Miércoles: " +
        appointmentDays.wednesdaySchedule +
        ", " +
        "Jueves: " +
        appointmentDays.thursdaySchedule +
        ", " +
        "Viernes: " +
        appointmentDays.fridaySchedule +
        ", " +
        "Sábado: " +
        appointmentDays.saturdaySchedule,
      supportcenter: { supcenId1: supportCenter },
    };
    const { error: postAppointmentError } = await createAppointment(
      newAppointment
    );
    if (!postAppointmentError) {
      console.log("Se creó la cita");
    } else {
      console.log("No se pudo crear la cita");
    }
  };

  const handleChange = (value) => {
    setSupportCenter(value);
  };

  return (
    <div>
      <div className="divButton">
        <Button type="primary" ghost size="large" onClick={showModal}>
          Crear nueva cita
        </Button>
      </div>
      <p />
      <Table
        columns={columns}
        dataSource={appointments}
        rowKey="appointmentId"
      />
      <Modal
        visible={isModalVisible}
        title="Crear una nueva cita"
        onOk={handleOk}
        onCancel={handleCancel}
        style={{ top: 20 }}
        footer={[
          <Button type="primary" key="submit" onClick={handleOk}>
            Crear cita
          </Button>,
          <Button type="primary" key="back" onClick={handleCancel} danger>
            Cancelar
          </Button>,
        ]}
      >
        <div>
          <div>
            <p>Centros de apoyo</p>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Select a Support center"
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
              value={supportCenter}
              onChange={handleChange}
            >
              {supportCenterData?.map((supportcenter) => (
                <Option
                  value={supportcenter.supcenId1}
                  key={supportcenter.supcenId1}
                >
                  {supportcenter.supcenName}
                </Option>
              ))}
            </Select>
          </div>
          <div className="inside-popup-boxes-r">
            <div></div>
            <div>
              <p>Razon de la cita</p>
              <Input
                id="appointmentComment"
                name="Appointment Reason"
                placeholder="Necesita ayuda en Calculo de una variable"
                type="text"
                value={reasonAppointment}
                onChange={(event) => setReasonAppointment(event.target.value)}
              />
            </div>
          </div>
          <div className="inside-popup-boxes">
            <div>
              <p>Lunes</p>
              <Input
                id="mondaySchedule"
                name="Lunes"
                placeholder="Ej: 7-9am, 4-6pm, ..."
                type="text"
                onChange={handleVariable}
              />
            </div>
            <div>
              <p>Martes</p>
              <Input
                id="tuesdaySchedule"
                name="Martes"
                placeholder="Ej: 7-9am, 4-6pm, ..."
                type="text"
                onChange={handleVariable}
              />
            </div>
            <div>
              <p>Miercoles</p>
              <Input
                id="wednesdaySchedule"
                name="Miercoles"
                placeholder="Ej: 7-9am, 4-6pm, ..."
                type="text"
                onChange={handleVariable}
              />
            </div>
          </div>
          <div className="inside-popup-boxes">
            <div>
              <p>Jueves</p>
              <Input
                id="thursdaySchedule"
                name="Jueves"
                placeholder="Ej: 7-9am, 4-6pm, ..."
                type="text"
                onChange={handleVariable}
              />
            </div>
            <div>
              <p>Viernes</p>
              <Input
                id="fridaySchedule"
                name="Viernes"
                placeholder="Ej: 7-9am, 4-6pm, ..."
                type="text"
                onChange={handleVariable}
              />
            </div>
            <div>
              <p>Sabado</p>
              <Input
                id="saturdaySchedule"
                name="Sabado"
                placeholder="Ej: 7-9am, 4-6pm, ..."
                type="text"
                onChange={handleVariable}
              />
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AppointmentsContainer;
