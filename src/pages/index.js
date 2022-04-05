import React from "react";
import { Route, Switch } from "react-router-dom";
import logo from "../assets/images/image.png";
import { Layout, Menu } from "antd";
import { useHistory } from "react-router-dom";
import {
  DesktopOutlined,
  HomeOutlined,
  AlertOutlined,
  SettingOutlined,
  StockOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import Home from "./Inicio/Inicio.jsx";
import Alertas from "./Alerts/Alerts.jsx";
import TiposAlerta from "./TiposAlerta/TiposAlerta.jsx";
import EditarAlertas from "./Alerts/EditarAlertas.jsx";
import CrearNivelRiesgoAlerta from "./NivelRiesgoAlerta/CrearNivelRiesgoAlerta";
import NivelRiesgoAlerta from "./NivelRiesgoAlerta/NivelRiesgoAlerta";
import CrearConfiguracionAlerta from "./ConfiguracionAlerta/CrearConfiguracionAlerta";
import ConfiguracionAlerta from "./ConfiguracionAlerta/ConfiguracionAlerta";
import CrearAlerta from "./Alerts/CrearAlerta";
import VisualizarAlertaAutomatica from "./VisualizarAlertaAutomatica/VisualizarAlertaAutomatica";
import CrearTiposAlerta from "./TiposAlerta/CrearTiposAlerta";
import AppointmentByDirector from "./AppointmentByDirector/AppointmentByDirector";
import AppointmentConfirmationByCenter from "./AppointmentConfirmationByCenter/AppointmentConfirmationByCenter";
import AppointmentByMonitor from "./AppointmentByMonitor/AppointmentByMonitor";
import AppointmentByStudent from "./AppointmentByStudent/AppointmentByStudent";
import LocalCondition from "./AlertConfiguration/LocalCondition";
import Threshold from "./AlertConfiguration/Threshold";
import RemoteCondition from "./AlertConfiguration/RemoteCondition";
import Precondition from "./AlertConfiguration/Precondition";
import PreconditionView from "./AlertConfiguration/PreconditionView";
import ThresholdView from "./AlertConfiguration/ThresholdView";

import { useSelector } from "react-redux";
import LocalConditionView from "./AlertConfiguration/LocalConditionView";
import RemoteConditionView from "./AlertConfiguration/RemoteConditionView";
import Task from "./AlertConfiguration/Task";
import AutomaticAlert from "./Alerts/AutomaticAlert";
import Trigger from "./AlertConfiguration/Trigger";
import AutomaticAlertView from "./Alerts/AutomaticAlertView";

const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

/**
 * @name ApplicationPage
 * Manejador de la página principal.
 * @param {*} props
 * @returns Application page
 */
const ApplicationPage = (props) => {
  /**
   * @name history
   * Se encarga de dar acceso a la instancia de la historia para que sea posible navegar.
   * @param {*} props
   * @returns Application page
   */
  const history = useHistory();
  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",");
  //console.log(permisos.includes("ROLE_Estudiante"));

  /**
   * @name handleNavigate
   * Esta función se encarga manejar la navegación de la página principal.
   * @param {*} route
   */
  const handleNavigate = (route) => {
    history.push(route);
  };

  return (
    <Layout style={{ height: "100vh", padding: " 0px 0px 0px" }}>
      <Header
        className="header"
        style={{
          backgroundColor: "#2764E3",
          padding: "0 24px",
          boxShadow: "rgba(53, 65, 143, 0.16) 0px 2px 27px 0px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            <figure style={{ width: 40, margin: 0 }}>
              <img style={{ width: "100%" }} src={logo} />
            </figure>
            <div style={{ width: 400, paddingTop: 5 }}>
              <span style={{}} className="titulo">
                SISTEMA DE ALERTAS TEMPRANAS
              </span>
            </div>
          </div>
          <div></div>
        </div>
      </Header>

      <Layout style={{ height: "100vh", padding: 0 }}>
        <Sider
          width={200}
          className="site-layout-background"
          style={{ boxShadow: "rgba(53, 65, 143, 0.16) 0px 2px 27px 0px" }}
        >
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
          >
            <Menu.Item
              key="1"
              icon={<HomeOutlined />}
              onClick={() => handleNavigate("/home")}
            >
              Inicio
            </Menu.Item>
            <Menu.Item
              key="2"
              icon={<AlertOutlined />}
              onClick={() => handleNavigate("/alerts")}
            >
              Alertas
            </Menu.Item>
            <Menu.Item
              key="3"
              icon={<DesktopOutlined />}
              onClick={() => handleNavigate("/alerts-type")}
            >
              Tipos de alertas
            </Menu.Item>
            <Menu.Item
              key="4"
              icon={<SettingOutlined />}
              onClick={() => handleNavigate("/pre-alerts")}
            >
              Configuración alertas
            </Menu.Item>
            <Menu.Item
              key="5"
              icon={<StockOutlined />}
              onClick={() => handleNavigate("/alerts-risk")}
            >
              Configuración nivel de riesgo
            </Menu.Item>
            <Menu.Item
              key="6"
              icon={<StockOutlined />}
              onClick={() => handleNavigate("/visualize-auto-alerts")}
            >
              Alertas automáticas
            </Menu.Item>
            <SubMenu
              key="sub2"
              icon={<DesktopOutlined />}
              title="Configuración"
            >
              <Menu.Item
                key="8"
                icon={<DesktopOutlined />}
                onClick={() => handleNavigate("/local-condition")}
              >
                Cond locales
              </Menu.Item>
              <Menu.Item
                key="9"
                icon={<DesktopOutlined />}
                onClick={() => handleNavigate("/remote-condition")}
              >
                Cond remotas
              </Menu.Item>
              <Menu.Item
                key="10"
                icon={<DesktopOutlined />}
                onClick={() => handleNavigate("/threshold")}
              >
                Threshold
              </Menu.Item>
              <Menu.Item
                key="11"
                icon={<DesktopOutlined />}
                onClick={() => handleNavigate("/precondition")}
              >
                Precondiciones
              </Menu.Item>
              <Menu.Item
                key="12"
                icon={<DesktopOutlined />}
                onClick={() => handleNavigate("/task")}
              >
                Tareas
              </Menu.Item>
              <Menu.Item
                key="16"
                icon={<DesktopOutlined />}
                onClick={() => handleNavigate("/trigger")}
              >
                Triggers
              </Menu.Item>
            </SubMenu>

            {permisos?.includes("ROLE_Director") ||
            permisos?.includes("ROLE_ADMIN") ? (
              <Menu.Item
                key="4"
                icon={<CalendarOutlined />}
                onClick={() => handleNavigate("/appointment-director")}
              >
                Citas Director
              </Menu.Item>
            ) : (
              <div />
            )}
            {permisos?.includes("ROLE_Centro") ||
            permisos?.includes("ROLE_ADMIN") ? (
              <Menu.Item
                key="5"
                icon={<CalendarOutlined />}
                onClick={() => handleNavigate("/appointment-center")}
              >
                Citas de Centro
              </Menu.Item>
            ) : (
              <div />
            )}
            {permisos?.includes("ROLE_Estudiante") ||
            permisos?.includes("ROLE_ADMIN") ? (
              <Menu.Item
                key="6"
                icon={<CalendarOutlined />}
                onClick={() => handleNavigate("/appointment-student")}
              >
                Citas estudiante
              </Menu.Item>
            ) : (
              <div />
            )}
            {permisos?.includes("ROLE_Monitor") ||
            permisos?.includes("ROLE_ADMIN") ? (
              <Menu.Item
                key="7"
                icon={<CalendarOutlined />}
                onClick={() => handleNavigate("/appointment-monitor")}
              >
                Citas monitor
              </Menu.Item>
            ) : (
              <div />
            )}
          </Menu>
        </Sider>

        <Layout style={{ padding: "0" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 0,
              margin: 0,
              minHeight: 280,
            }}
          >
            <Switch>
              <Route exact path="/home" component={Home} />
              <Route exact path="/alerts" component={Alertas} />
              <Route exact path="/autoalerts" component={AutomaticAlert} />
              <Route
                exact
                path="/alerts/edit/:idAlert"
                component={EditarAlertas}
              />
              <Route exact path="/alerts-type" component={TiposAlerta} />
              <Route
                exact
                path="/config-alerts-type"
                component={CrearTiposAlerta}
              />
              <Route
                exact
                path="/config-alerts-risk"
                component={CrearNivelRiesgoAlerta}
              />
              <Route exact path="/alerts-risk" component={NivelRiesgoAlerta} />
              <Route
                exact
                path="/config-pre-alerts"
                component={CrearConfiguracionAlerta}
              />
              <Route exact path="/pre-alerts" component={ConfiguracionAlerta} />
              <Route exact path="/new-alert" component={CrearAlerta} />
              <Route
                exact
                path="/visualize-auto-alerts"
                component={VisualizarAlertaAutomatica}
              />
              <Route
                exact
                path="/appointment-director"
                component={AppointmentByDirector}
              />
              <Route
                exact
                path="/appointment-center"
                component={AppointmentConfirmationByCenter}
              />
              <Route
                exact
                path="/appointment-director"
                component={AppointmentByDirector}
              />
              <Route
                exact
                path="/appointment-center"
                component={AppointmentConfirmationByCenter}
              />
              <Route
                exact
                path="/appointment-monitor"
                component={AppointmentByMonitor}
              />
              <Route
                exact
                path="/appointment-student"
                component={AppointmentByStudent}
              />
              <Route exact path="/threshold" component={Threshold} />
              <Route
                exact
                path="/threshold/:idThreshold"
                component={ThresholdView}
              />
              <Route exact path="/precondition" component={Precondition} />
              <Route
                exact
                path="/precondition/:idPrecondition"
                component={PreconditionView}
              />
              <Route path="/local-condition" component={LocalCondition} />
              <Route
                exact
                path="/precondition/localconditions/:idlocalCondition"
                component={LocalConditionView}
              />
              <Route
                exact
                path="/remote-condition"
                component={RemoteCondition}
              />
              <Route
                exact
                path="/precondition/remoteconditions/:idRemoteCondition"
                component={RemoteConditionView}
              />
              <Route exact path="/task" component={Task} />
              <Route
                exact
                path="/task/autoalerts/:idTask"
                component={AutomaticAlertView}
              />
              <Route exact path="/trigger" component={Trigger} />
            </Switch>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default ApplicationPage;
