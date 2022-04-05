import React from "react";
//import NavbarLO from "../../commons/NavBarLO/NavbarLO";
//import Options from "../../commons/Options/Options";
//import AppointmentTable from "../../commons/components/Appointment/AppointmentTableForMonitor/AppointmentTableForMonitor";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
//import LabelSecondary from "../../commons/Label/LabelSecondary";
import { Table, Tag } from "antd";
import { useGetAppointmentsByPersonQuery } from "../../redux/api/mainAPI";
import { useSelector } from "react-redux";
import "./AppointmentByMonitor.css";

const AppointmentByMonitor = () => {
  const { user } = useSelector((state) => state.userLogin);
  const { data: appointmentsData } = useGetAppointmentsByPersonQuery(
    user?.userrId
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "appointmentId",
      key: "appointmentId",
    },
    {
      title: "Comentario",
      dataIndex: "appointmentComment",
      key: "appointmentComment",
    },
    {
      title: "Modalidad",
      dataIndex: "appointmentModality",
      key: "appointmentModality",
      render: (appointmentModality) =>
        appointmentModality === "P" ? "Presencial " : "Virtual",
    },
    {
      title: "Place",
      dataIndex: "appointmentPlace",
      key: "appointmentPlace",
    },
    {
      title: "Fecha",
      dataIndex: "appointmentDate",
      key: "appointmentDate",
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
  ];

  return (
    <SectionTitle title="Citas del monitor">
      <Table
        columns={columns}
        dataSource={appointmentsData}
        rowKey="appointmentId"
      ></Table>
    </SectionTitle>
    /** 
    <div className="information-container">
      <LabelSecondary className="labelSecundary" text="My appointments" />
      <AppointmentTable></AppointmentTable>
    </div>
    */
  );
};

export default AppointmentByMonitor;
