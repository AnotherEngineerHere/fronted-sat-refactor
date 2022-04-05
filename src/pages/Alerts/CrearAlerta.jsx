import React, { useState } from "react";

import { useFormik } from "formik";
import { Input, Row, Col, Select, Switch } from "antd";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import LabelInput from "../../components/LabelInput";
import { secondaryColor } from "../../commons/constants/StylesConstants";
import { useGetStudentsByProgramQuery, useGetPreAlertQuery, usePostAlertInstanceMutation } from "../../redux/api/mainAPI";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";


import { useParams } from "react-router";

const CrearAlerta = () => {
    const [student, setStudent] = useState();
    const [preAlert, setPreAlert] = useState();
    const [description, setAlertDescription] = useState();
    const [alertState, setAlertState] = useState();
    const [alertDeactivate, setAlertDeactivate] = useState();


    const [createAlertInstance] = usePostAlertInstanceMutation();

    const { idAlert } = useParams();
    const { Option } = Select;
    const { TextArea } = Input;

    console.log(idAlert);


    //Métodos para el select
    function onChange(value) {
        console.log(`selected ${value}`);
    }
    function onBlur() {
        console.log('blur');
    }
    function onFocus() {
        console.log('focus');
    }
    function onSearch(val) {
        console.log('search:', val);
    }
    const handleChangeStudentAlert = (value) => {
        setStudent(value);
    };
    const handleChangePreAlert = (value) => {
        setPreAlert(value);
    };
    const handleChangeAlertState = (value) => {
        setAlertState(value);
    };
    /////////////////////////


    //Para el switch 
    function onChangeSwitch(checked) {
        setAlertDeactivate(checked)
        console.log(`switch to ${checked}`);
    }
    //Para guardar una alerta predefinida
    const SaveAlertInstance = async () => {
        const newAlertInstance = {
            alertDescription: description,
            alertPersons: { person: student },
            alertDeactivate: alertDeactivate,
            alertState: alertState,
            alert: {alertId: prealert}
        };
        const {
            data: postPreAlertData,
            error: postPreAlertError,
            isLoading,
        } = await createAlertInstance(newAlertInstance);
    };

    const {
        data: studentsData,
        error: studentsError,
        studentsLoading,
    } = useGetStudentsByProgramQuery();

    const {
        data: prealertData,
        error: prealertError,
        prealertLoading,
    } = useGetPreAlertQuery();
    const prealert = prealertData;

    const formik = useFormik({

        onSubmit: (values) => {
            alert(JSON.stringify(values, null, 2));
        },
    });
    return (
        <SectionTitle title={"Crear alerta"}>
            <div
                style={{
                    backgroundColor: "#ffffff",
                    padding: 30,
                    borderRadius: 16,
                    boxShadow: "rgba(53, 65, 143, 0.16) 0px 2px 27px 0px",
                }}
            >
                <form onSubmit={formik.handleSubmit}>
                    <Row gutter={10}>
                        <Col xs={12} md={12}>
                            <LabelInput labelText={"Estudiante"} nameInput={"studentAlert"} />
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Seleccione una opción..."
                                optionFilterProp="children"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={student}
                                onChangeStudent={handleChangeStudentAlert}
                            >
                                {studentsData?.map((studentalert) => (
                                    <Option value={studentalert.persId} key={studentalert.persId}>
                                        {studentalert.persName + " " + studentalert.persLastName}
                                    </Option>
                                ))}
                            </Select>
                        </Col>

                        <Col xs={12} md={12}>
                            <LabelInput
                                labelText={"Alertas predefinidas"}
                                nameInput={"preAlert"}
                            />
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Seleccione una opción..."
                                optionFilterProp="children"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={preAlert}
                                onChangeOption={handleChangePreAlert}
                            >
                                {prealertData?.map((prealert) => (
                                    <Option value={prealert.alertId} key={prealert.alertId}>
                                        {prealert.alertDescription}
                                    </Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>

                    <Row gutter={10} style={{ marginTop: 20 }}>
                        <Col xs={12} md={12}>
                            <LabelInput
                                labelText={"Estado"}
                                nameInput={"alertState"}
                            />
                            <Select
                                showSearch
                                style={{ width: "100%" }}
                                placeholder="Seleccione una opción..."
                                optionFilterProp="children"
                                onChange={onChange}
                                onFocus={onFocus}
                                onBlur={onBlur}
                                onSearch={onSearch}
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                                value={alertState}
                                onChangeAlertState={handleChangeAlertState}
                            >
                                <Option value="atendida">Atendida</Option>
                                <Option value="noAtendida">No atendida</Option>
                                <Option value="enEspera">En espera</Option>
                            </Select>
                        </Col>

                        <Col xs={12} md={12}>
                            <LabelInput
                                labelText={"Descripción"}
                                nameInput={"description"}
                            />
                            <TextArea
                                placeholder="Descripción"
                                id="description"
                                name="description"
                                type="text"
                                onChange={(event) =>
                                    setAlertDescription(event.target.value)
                                }
                                value={description}
                                rows={2}
                            />
                        </Col>

                        <Col xs={12} md={12}>
                            <LabelInput
                                labelText={"Desactivar"}
                                nameInput={"alertDeactivate"}
                            />
                            <Switch defaultChecked checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />} onChange={onChangeSwitch} />
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
                        <button
                            style={{
                                backgroundColor: secondaryColor,
                                color: "white",
                                borderColor: secondaryColor,
                                height: "30px",
                                width: "80px",
                                borderRadius: "3px",
                            }}
                            type="submit"
                            onClick={SaveAlertInstance}
                        >Crear</button>

                        {/*onClick={SavePreAlert}*/}
                    </div>
                </form>
            </div>
        </SectionTitle>
    );
};

export default CrearAlerta;
