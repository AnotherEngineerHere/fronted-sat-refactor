import React, { useState } from "react";

import "./ConfiguracionTipoAlerta1.css";
import Label1 from "../../../commons/components/ConfiguracionTipoAlerta1/Label1/Label1";
import Label2 from "../../../commons/components/ConfiguracionTipoAlerta1/Label2/Label2";
import Input1 from "../../../commons/components/ConfiguracionTipoAlerta1/Input1/Input1";
import Select1 from "../../../commons/components/ConfiguracionTipoAlerta1/Select1/Select1";
import NavbarLO from "../../../commons/NavBarLO/NavbarLO";
import Options from "../../../commons/Options/Options";
import ButtonPrimary from "../../../commons/components/Alerta/ButtonPrimary/ButtonPrimary";

const ConfiguracionTipoAlerta1 = () => {
  document.title = "Configuración Tipo Alerta";
  const [user, setUser] = useState("");

  function handleChange(name, value) {
    if (name === "usuario") {
      setUser(value);
    }
  }

  return (
    <div className="general-container-TP1">
      <NavbarLO></NavbarLO>
      <div className="info-container-TP1">
        <Options></Options>
        <div className="options-TP1">
          <Label2 text="Tipo Alerta"></Label2>
          <Label1 text=""></Label1>
          <Label2 text="NOMBRE"></Label2>
          <Input1
            attribute={{
              id: "nombre",
              name: "nombre",
              type: "text",
              placeholder: "Ingrese el nombre",
            }}
            handleChange={handleChange}
          />
          <Label2 text="CATEGORIA"></Label2>
          <Select1 text="categoria"></Select1>
          <Label2 text="GENERADA"></Label2>
          <Select1 text="generada"></Select1>
          <label></label>
          <ButtonPrimary text="guardar"></ButtonPrimary>
        </div>
      </div>
    </div>
  );
};
export default ConfiguracionTipoAlerta1;
