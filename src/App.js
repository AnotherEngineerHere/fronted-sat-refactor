import "./App.css";
import React from "react";
import { BrowserRouter, Route, Redirect} from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Inicio/Inicio";
import Alerta from "./pages/Alerta/Alerta";
import CreateAlert from "./pages/CreateAlert/CreateAlert";
import VisualizeAlert from "./pages/VisualizeAlert/VisualizeAlert";
import AppointmentByDirector from "./pages/AppointmentByDirector/AppointmentByDirector";
import MyAppointments from "./pages/AppointmentByStudent/AppointmentByStudent";
import AppointmentConfirmationByCenter from "./pages/AppointmentConfirmationByCenter/AppointmentConfirmationByCenter";
import AppointmentByMonitor from "./pages/AppointmentByMonitor/AppointmentByMonitor";

import { breakStatement } from "@babel/types";
import LocalCondition from "./pages/app/LocalConditions/LocalCondition";
import Threshold from "./pages/app/AlertConfiguration/Threshold";
import RemoteCondition from "./pages/app/AlertConfiguration/RemoteCondition";
import Precondition from "./pages/app/AlertConfiguration/Precondition";
import PreconditionView from "./pages/app/AlertConfiguration/PreconditionView";
import ThresholdView from "./pages/app/AlertConfiguration/ThresholdView";
import LocalConditionView from "./pages/app/AlertConfiguration/LocalConditionView";
import RemoteConditionView from "./pages/app/AlertConfiguration/RemoteConditionView";
import Task from "./pages/app/AlertConfiguration/Task";
import AutomaticAlertView from "./pages/app/Alertas/AutomaticAlertView";

function App() {
  return (
    <BrowserRouter>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route exact path="/login" component={Login} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/alert" component={Alerta} />
      <Route exact path="/createAlert" component={CreateAlert} />
      <Route exact path="/visualizeAlert" component={VisualizeAlert} />
      <Route
        exact
        path="/appointment/ByDirector"
        component={AppointmentByDirector}
      />
      <Route exact path="/appointment/ByStudent" component={MyAppointments} />
      <Route
        exact
        path="/appointment/ByCenter"
        component={AppointmentConfirmationByCenter}
      />
      <Route
        exact
        path="/appointment/ByMonitor"
        component={AppointmentByMonitor}
      />
      <Route
        exact
        path="/local-condition"
        component={LocalCondition}
      />
      <Route
        exact
        path="/threshold"
        component={Threshold}
      />
      <Route exact path="/threshold/:idThreshold" component={ThresholdView} />
      <Route
        exact
        path="/remote-condition"
        component={RemoteCondition}
      />
      <Route exact path="/precondition/:idPrecondition" component={PreconditionView} />
      <Route
        exact
        path="/precondition"
        component={Precondition}
      />
       <Route exact path="/precondition/localconditions/:idPrecondition" component={LocalConditionView} />
       <Route exact path="/precondition/remoteconditions/:idPrecondition" component={RemoteConditionView} />
       <Route
                exact
                path="/task"
                component={Task}
              />
              <Route exact path="/task/autoalerts/:idTask" component={AutomaticAlertView} />
    </BrowserRouter>
  );
}

export default App;
