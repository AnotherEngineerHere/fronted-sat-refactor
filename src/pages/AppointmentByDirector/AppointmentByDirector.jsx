import React, { useState } from "react";
import "./AppointmentByDirector.css";
import { Table, Button, Select, Input, Modal } from "antd";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import {
  useGetStudentsByProgramQuery,
  useGetAppointmentsByPersonQuery,
  usePostAppointmentMutation,
  useGetSupportCenterQuery,
} from "../../redux/api/mainAPI";
import { useSelector } from "react-redux";

const { Option } = Select;

const AppointmentByDirector = () => {
  document.title = "AppointmentByDirector";
  const { user } = useSelector((state) => state.userLogin);

  const [variable, setVariable] = React.useState(null);
  const [supportCenter, setSupportCenter] = React.useState(null);
  const [createAppointment] = usePostAppointmentMutation();
  const { data: supportCenterData } = useGetSupportCenterQuery();

  const handleVariable = (event) => {
    setVariable({ ...variable, [event.target.id]: event.target.value });
  };

  const { data: studentsData } = useGetStudentsByProgramQuery();
  const { data: appointmentsData } = useGetAppointmentsByPersonQuery(
    user?.userrId
  );

  //console.log(studentsData);
  //console.log(appointmentsData);

  const handleChange = (value) => {
    setSupportCenter(value);
  };

  const columns = [
    {
      title: "Centro de apoyo",
      dataIndex: "supportcenter",
      key: "supportcenter",
      render: (supportcenter) => <>{supportcenter?.supcenName}</>,
    },
    {
      title: "Email del Monitor",
      dataIndex: "supportcenter",
      key: "supportcenter",
      render: (supportcenter) => <>{supportcenter?.supcenEmail}</>,
    },
    {
      title: "Fecha",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
    },
    {
      title: "Hora",
      dataIndex: "appointmentComment",
      key: "appointmentComment",
    },
    {
      title: "Lugar",
      dataIndex: "appointmentPlace",
      key: "appointmentPlace",
    },
  ];

  const [isOpen, setIsOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const handleOk = () => {
    AcceptClick();
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const AcceptClick = async () => {
    const appointment = {
      appointmentComment:
        variable.appointmentComment +
        "/" +
        variable.mondaySchedule +
        "," +
        variable.tuesdaySchedule +
        "," +
        variable.wednesdaySchedule +
        "," +
        variable.thursdaySchedule +
        "," +
        variable.fridaySchedule +
        "," +
        variable.saturdaySchedule,
      appointmentDate: "2021-12-31",
      appointmentModality: "I",
      appointmentObservation: "I",
      appointmentPlace: "ZOOM",
      appointmentState: "M",
      supportcenter: { supcenId1: supportCenter },
    };
    console.log(variable);
    const { error: postAppointmentError } = await createAppointment(
      appointment
    );
    console.log(variable);
  };

  return (
    <SectionTitle title="Citas Creadas">
      <div className="appointmentsContainer">
        <div className="divButton">
          <Button type="primary" ghost size="large" onClick={showModal}>
            Crear nueva cita
          </Button>
        </div>
        <p />
        <Table
          columns={columns}
          dataSource={appointmentsData}
          rowKey="appointmentId"
        />
        <Modal
          visible={isOpen}
          title="Crear una nueva cita"
          onOk={handleOk}
          onCancel={handleCancel}
          style={{ top: 15 }}
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
              <p>Estudiante</p>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Select a student"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {studentsData?.map((student) => (
                  <Option value={student.persId} key={student.persId}>
                    {student.persName + " " + student.persLastName}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="inside-popup-boxes">
              <div>
                <p>Centro de apoyo</p>
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Select a support center"
                  optionFilterProp="children"
                  onChange={handleChange}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {supportCenterData?.map((supcen) => (
                    <Option value={supcen.supcenId1} key={supcen.supcenId1}>
                      {supcen.supcenName}
                    </Option>
                  ))}
                </Select>
              </div>
              <div></div>
              <div>
                <p>Razon de la cita</p>
                <Input
                  id="appointmentComment"
                  name="Appointment Reason"
                  placeholder="Necesita ayuda en Calculo de una variable"
                  type="text"
                  onChange={handleVariable}
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
    </SectionTitle>
  );
};
export default AppointmentByDirector;
