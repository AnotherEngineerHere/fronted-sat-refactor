import React, { useState } from "react";
import "./AppointmentConfirmationByCenter.css";
import {
  Table,
  Button,
  Select,
  Input,
  Space,
  Tag,
  DatePicker,
  Modal,
} from "antd";
import Popup from "../../commons/Popup/Popup";
import { HiClipboardList } from "react-icons/hi";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import {
  useGetAppointmentsByPersonQuery,
  usePutAppointmentMutation,
} from "../../redux/api/mainAPI";
import { useSelector } from "react-redux";

const AppointmentConfirmationByCenter = () => {
  document.title = "AppointmentConfirmationByCenter";
  const { user } = useSelector((state) => state.userLogin);

  const dateFormat = "YYYY-MM-DD";

  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setCommentAppointment(variable?.appointmentComment);
    setIsModalVisible(true);
  };

  const handleOk = () => {
    AcceptClick();
    setIsModalVisible(false);
    //saveAppointment();
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const { Option } = Select;
  const [variable, setVariable] = useState(null);
  const [commentAppointment, setCommentAppointment] = useState(
    variable?.appointmentComment
  );

  const handleVariable = (event) => {
    setVariable({ ...variable, [event.target.id]: event.target.value });
  };
  //const handleChange = (value) => {
  //  setAppointment(value);
  //};

  const { data: appointmentsData } = useGetAppointmentsByPersonQuery(
    user?.userrId
  );
  const [appointments, setAppointments] = useState(appointmentsData);
  //const [appointment, setAppointment] = useState();

  const [editAppointment] = usePutAppointmentMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");

  //const togglePopup = () => {
  //  setCommentAppointment(variable?.appointmentComment);
  //  setIsOpen(!isOpen);
  //};

  const supportCenter = [
    { label: "CAMBAS", value: "CAMBAS" },
    { label: "LEO", value: "LEO" },
    { label: "EL Center", value: "EL" },
    { label: "Ingenieria de Sistemas", value: "SIS" },
    { label: "Psicologia", value: "PSI" },
  ];

  const columns = [
    {
      title: "Id de la cita",
      dataIndex: "appointmentId",
      key: "appointmentId",
    },
    {
      title: "Fecha",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
    },
    {
      title: "Estado de la cita",
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
      title: "Lugar",
      dataIndex: "appointmentPlace",
      key: "appointmentPlace",
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a onClick={() => {
              setVariable(record);
              console.log("NONNONONONONONONO");
              console.log(variable);
              showModal();
            }}
          >
            Confirmar cita
          </a>
        </Space>
      ),
    },
  ];

  const updateAppo = (id, newAppo) => {
    const appoUpdated = appointments.map((appointment) => {
      if (appointment.appointmentId === id) {
        return { ...appointment, appointment: newAppo };
      }
      return appointment;
    });
    console.log(appoUpdated);
    setAppointments(appoUpdated);
  };

  const AcceptClick = async () => {
    const newAppointment = {
      appointmentObservation: variable.appointmentObservation,
      appointmentId: variable.appointmentId,
      appointmentModality: variable.appointmentModality,
      appointmentDate: date,
      appointmentPlace: place,
      appointmentState: "Y",
      appointmentComment: variable.appointmentComment,
      supportcenter: variable.supportcenter,
    };
    updateAppo(newAppointment.appointmentId, newAppointment);
    const { error: putAppointmentError } = await editAppointment(
      newAppointment
    );
    if (!putAppointmentError) {
      console.log("Se editó la cita correctamente");
    } else {
      console.log("No se pudo editar la cita");
    }
    setIsModalVisible(false);
  };

  return (
    <SectionTitle title="Citas Asignadas">
      <div className="appointmentsContainer">
        <p />
        <Table
          columns={columns}
          dataSource={appointments}
          rowKey="appointmentId"
        />
        <Modal
          visible={isModalVisible}
          title="Asignar una cita"
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ top: 20 }}
          footer={[
            <Button type="primary" key="submit" onClick={handleOk}>
              Asignar cita
            </Button>,
            <Button type="primary" key="back" onClick={handleCancel} danger>
              Cancelar
            </Button>,
          ]}
        >
          <div>
            <p>Comentario</p>
            <Input disabled={true} value={commentAppointment} />

            <hr />

            <div>
              <div>
                <p>Id de la cita</p>
                <Input disabled={true} value={variable?.appointmentId}></Input>
              </div>
            </div>

            <hr />

            <div className="inside-popup-boxes">
              <div>
                <p>Monitor</p>
                <Input
                  id="monitorName"
                  name="Monitor"
                  placeholder="Ej: Julanito de tal"
                  type="text"
                  onChange={handleVariable}
                />
              </div>
              <div>
                <p>Monitor EMail</p>
                <Input
                  id="monitorEmail"
                  name="Monitor Email"
                  placeholder="Ej: julanito@example.com"
                  type="text"
                  onChange={handleVariable}
                />
              </div>
            </div>

            <div className="inside-popup-boxes">
              <div>
                <p>Lugar</p>
                <Input
                  id="place"
                  name="Lugar"
                  placeholder="Ej: CAMBAS Edificio A"
                  type="text"
                  value={place}
                  onChange={(event) => setPlace(event.target.value)}
                />
              </div>
              <div>
                <p>Fecha</p>
                <DatePicker
                  format={dateFormat}
                  onChange={(dateString) => setDate(dateString)}
                ></DatePicker>
              </div>
              <div>
                <p>Hora</p>
                <Input
                  id="time"
                  name="Hora"
                  placeholder="Ej: 7-9am, 4-6pm, ..."
                  type="text"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </SectionTitle>
  );
};
export default AppointmentConfirmationByCenter;
