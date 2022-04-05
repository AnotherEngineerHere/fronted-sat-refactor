import React from "react";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import { Table, Switch, Divider, } from "antd";
import { Link } from "react-router-dom";

import { EditOutlined, FormOutlined } from "@ant-design/icons";
import { primaryColor, secondaryColor } from "../../commons/constants/StylesConstants"
import { useGetAlertInstanceQuery } from "../../redux/api/mainAPI";

const columns = [
  {
    title: "ID",
    dataIndex: "alertInstanceId",
    key: "alertInstanceId",
  },
  {
    title: "Estudiante",
    dataIndex: "Fabio",
    key: "Fabio",
    //render: (person) => <>{person.persName + " " + person.persLastName}</>

  },
  {
    title: "Alerta predefinida",
    dataIndex: "alert",
    key: "alert",
    render: (alert) => <>{alert?.alertDescription}</>
  },
  {
    title: "Estado",
    dataIndex: "alertState",
    key: "alertState",
    /*render: (tags) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? "geekblue" : "green";
          if (tag === "loser") {
            color = "volcano";
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),*/
  },
  {
    title: "Descripción",
    dataIndex: "alert",
    key: "alert",
    render: (alert) => <>{alert?.alertComment}</>
  },
  {
    title: "Acciones",
    dataIndex: "actions",
    key: "actions",
    render: (text, record) => {
      return (
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div>
            <Link to={`alerts/edit/${record.id}`}>
              <EditOutlined
                style={{ color: primaryColor, fontSize: 20, marginTop: 3 }}
              />
            </Link>
          </div>
          <Divider type="vertical" style={{ marginTop: 8 }} />
          <div>
            <Switch defaultChecked onChange={() => { }} />
          </div>
        </div>
      );
    },
  },
];
const Alerts = () => {
  document.title = "Alerts";

  const {
    data: alertinstanceData,
  } = useGetAlertInstanceQuery();
  const alertinstances = alertinstanceData;

  return (
    <SectionTitle title={"Alertas"}>
      <Link to={`/new-alert`}>
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
            type="submit">{<FormOutlined />} Nuevo</button>
        </div>
      </Link>

      <Table dataSource={alertinstances} rowKey="alertInstanceId" columns={columns} />
    </SectionTitle>
  );
};
export default Alerts;
