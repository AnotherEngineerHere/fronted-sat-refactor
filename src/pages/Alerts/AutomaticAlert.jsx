import React, {useState} from "react";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import {
    Table,
    Select,
    Divider,
    Button,
    Tag,
    Col,
    Input,
    Row,
    Modal,
    Popconfirm,
  } from "antd";
import LabelInput from "../../components/LabelInput";
import {DeleteOutlined } from "@ant-design/icons";
import { useFormik } from "formik";
import { EditOutlined } from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";
import { useGetAlertsTypeQuery, useGetRiskLevelQuery, useGetPreconditionsQuery, useGetAutomaticAlertsQuery, useCreateAutoAlertMutation, useUpdateAutoAlertMutation, useDeletAutoAlertMutation, useGetTriggersQuery } from "../../redux/api/mainAPI";
import { useSelector } from "react-redux";
const { Option } = Select;
const operatorData = ["AND", "OR", "NOT"];

const AutomaticAlert = () =>{
    document.title = "Alertas automaticas";
    const { user } = useSelector((state) => state.userLogin);
    const permisos = user?.role?.split(",") ?? "";
    // const userInfo = 'directive';
    const userInfo = permisos.includes("ROLE_Directive-AutoAlert")
      ? "directive"
      : permisos.includes("ROLE_Admin-AutoAlert")
      ? "adm"
      : "";
    const [itemSelected, setItemSelected] = useState(0);
    const [typeModal, setTypeModal] = useState("");
    const [showModal, setShowModal] = useState(false);
    const {data: dataSource,  error: autoErrorReq, autoLoadingReq} = useGetAutomaticAlertsQuery(userInfo);
    const [createAutoAlertReq, {isLoading: createLoading}] = useCreateAutoAlertMutation();
    const [updateAutoAlertReq, {isLoading: updateLoading}] = useUpdateAutoAlertMutation();
    const [deleteAutoAlertReq, {isLoading: deletLoading}] = useDeletAutoAlertMutation();
    const {data: riskLevelData,  error: riskLevelReqError, riskLevelReqLoading} = useGetRiskLevelQuery();
    const {data: alertTypeData,  error: alertTypeError, alertTypeLoading} = useGetAlertsTypeQuery();
    const {data: preconData,  error: preconError, preconLoading} = useGetPreconditionsQuery(userInfo);
    const {data: triggerData,  error: trigerError, triggerLoading} = useGetTriggersQuery(userInfo);

    const formik = useFormik({
        initialValues: {
            key: "",
            autoalertId: "",
            autoalertName: "",
            autoalertDescription: "",
            autoalertLogicaloperand: "",
            altRskLvlAlertRskLevelId: "",
            altTypeAlerttpId: "",
        },
        
        onSubmit: async (values) => {
        if (values.typeForm === "create") {
            const autoAlertToAdd = {
                autoalertName: values.autoalertName,
                autoalertDescription: values.autoalertDescription,
                autoalertLogicaloperand: values.autoalertLogicaloperand,
                altRskLvlAlertRskLevelId: values.altRskLvlAlertRskLevelId,
                altTypeAlerttpId: values.altTypeAlerttpId,
                triggers: values.triggers,
                preconditions: values.preconditions
            }
            console.log(autoAlertToAdd);
            await createAutoAlertReq({userInfo, autoAlertToAdd});
        } else {
            const autoAlertToEdit = {
              autoalertId:itemSelected,
                autoalertName: values.autoalertName,
                autoalertDescription: values.autoalertDescription,
                autoalertLogicaloperand: values.autoalertLogicaloperand,
                altRskLvlAlertRskLevelId: values.altRskLvlAlertRskLevelId,
                altTypeAlerttpId: values.altTypeAlerttpId,
                triggers: values.triggers,
                preconditions: values.preconditions
            }
            await updateAutoAlertReq({userInfo,autoAlertToEdit});
        }
        },
    });

    const setForkiFields = (values, from) =>{
        if(from==="create"){
          formik.setFieldValue("autoalertName", '');
          formik.setFieldValue("autoalertDescription", '');
          formik.setFieldValue("autoalertLogicaloperand",'');
          formik.setFieldValue("altRskLvlAlertRskLevelId",'');
          formik.setFieldValue("altTypeAlerttpId",'');
          formik.setFieldValue("preconditions",[]);
          formik.setFieldValue("triggers",[]);
        }
        else if(from==="edit"){
          formik.setFieldValue("autoalertName", values.autoalertName);
          formik.setFieldValue("autoalertDescription",values.autoalertDescription);
          formik.setFieldValue("autoalertLogicaloperand",values.autoalertLogicaloperand);
          formik.setFieldValue("altRskLvlAlertRskLevelId",values.altRskLvlAlertRskLevelId);
          formik.setFieldValue("altTypeAlerttpId",values.altTypeAlerttpId);
          formik.setFieldValue("preconditions",values.preconditions);
          formik.setFieldValue('triggers', values.triggers);
        }
    };
    
    function  deleteAutoAlert(autoAlertId){
      deleteAutoAlertReq({autoAlertId,userInfo});
 }
 
    const onShowModal = (type) => {
        setTypeModal(type);
        formik.setFieldValue("typeForm", type);
        setShowModal(true);
    };
    
    const onCancelModal = () => {
        setShowModal(false);
    };
    
    const operatorHandleChange = value => {
        formik.setFieldValue("autoalertLogicaloperand",value);
      };
    const rskHandleChange = value => {
      let risk=  riskLevelData.find(risk => risk.alertRskLevelId===parseInt(value));
        formik.setFieldValue("altRskLvlAlertRskLevelId", risk);
    };
    const alertTypeHandleChange = value =>{
      let alertType=  alertTypeData.find(alType => alType.alerttpId===parseInt(value));
        formik.setFieldValue("altTypeAlerttpId",alertType);
    };
    const preconHandleChange = value => {
      let precons = [];
      value.forEach(preconId => precons.push(preconData.find(precon => precon.preconId===parseInt(preconId))));
        formik.setFieldValue("preconditions",precons);
      };
    const triggerHandleChange = value => {
      let triggers = [];
      value.forEach(trigId => triggers.push(triggerData.find(trig => trig.trgId===parseInt(trigId))));
        formik.setFieldValue("triggers",triggers);
    };
    const formAutoAlert = (
        <div>
          <form onSubmit={formik.handleSubmit}>
            <Row gutter={10}>
              <Col xs={12} md={12}>
                <LabelInput
                  labelText={"Nombre de la alerta"}
                  nameInput={"autoalertName"}
                />
                <Input
                  placeholder=""
                  name="autoalertName"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.autoalertName}
                />
              </Col>
    
              <Col xs={12} md={12}>
                <LabelInput
                  labelText={"Descripción"}
                  nameInput={"autoalertDescription"}
                />
                <Input
                  placeholder=""
                  name="autoalertDescription"
                  type="text"
                  onChange={formik.handleChange}
                  value={formik.values.autoalertDescription}
                />
              </Col>
            </Row>
    
            <Row gutter={10} style={{ marginTop: 20 }}>
              <Col xs={12} md={12}>
                <LabelInput labelText={"Operador"} nameInput={"autoalertLogicaloperand"} />
                <Select className="ant-select-selection" defaultValue=">" value={formik.values.autoalertLogicaloperand} onChange={operatorHandleChange}>
                    {operatorData.map(operator => (
                      <Option key={operator}>{operator}</Option>
                    ))}
                </Select>
              </Col>
              <Col xs={12} md={12}>
                <LabelInput
                labelText={"Riesgo"}
                nameInput={"altRskLvlAlertRskLevelId"}
                />
                <Select className="ant-select-selection" values={formik.values.altRskLvlAlertRskLevelId} onChange={rskHandleChange}>
                    {riskLevelData && riskLevelData.map(riskLevel => (
                    <Option key={riskLevel.alertRskLevelId}>{riskLevel.alertRskLevelName}</Option>
                    ))}
                    
                </Select>
            
             </Col>
            </Row>
    
            <Row gutter={10} style={{ marginTop: 20 }}>
              <Col xs={12} md={12}>
                <LabelInput
                  labelText={"Tipo"}
                  nameInput={"altTypeAlerttpId"}
                />
                 <Select className="ant-select-selection" onChange={alertTypeHandleChange}>
                    {alertTypeData && alertTypeData.map(alertType => (
                    <Option key={alertType.alerttpId}>{alertType.alerttpName}</Option>
                    ))}
                    
                </Select>
              </Col>
              <Col xs={12} md={12}>
                <LabelInput
                  labelText={"Precondiciones"}
                  nameInput={"preconditions"}
                />
                <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="Please select" onChange={preconHandleChange}>
                    {preconData && preconData.map(precon => (
                      <Option key={precon.preconId}>id:{ precon.preconId} ope: {precon.preconLogicaloperand}</Option>
                    ))}
                </Select>
              </Col>
            </Row>
            <Row gutter={10} style={{ marginTop: 20 }}>
              <Col xs={12} md={12}>
                <LabelInput
                  labelText={"Triggers"}
                  nameInput={"triggers"}
                />
                <Select mode="multiple" allowClear style={{ width: '100%' }} placeholder="Please select" onChange={triggerHandleChange}>
                    {triggerData && triggerData.map(trigger => (
                      <Option key={trigger.trgId}>{trigger.trgName}</Option>
                    ))}
                </Select>
                
                {/*<div>
                    <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
                  </div>*/}
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
        dataIndex: "autoalertId",
        key: "autoalertId",
    },
    {
        title: "Nombre",
        dataIndex: "autoalertName",
        key: "autoalertName",
    },
    {
        title: "Descripción",
        dataIndex: "autoalertDescription",
        key: "autoalertDescription",
    },
    {
        title: "Operador",
        dataIndex: "autoalertLogicaloperand",
        key: "autoalertLogicaloperand",
    },
    {
        title: "Tipo",
        dataIndex: "altTypeAlerttpId",
        key: "altTypeAlerttpId",
        render: (altTypeAlerttpId) => (
        <>
            { <Tag color={altTypeAlerttpId.alerttpId===1?"red":altTypeAlerttpId.alerttpId===2? "yellow": "geekblue"} key={altTypeAlerttpId}>
                {altTypeAlerttpId.alerttpName.toUpperCase()}
            </Tag>  
            }   
        </>
        ),
    },
    {
        title: "Riesgo",
        key: "altRskLvlAlertRskLevelId",
        dataIndex: "altRskLvlAlertRskLevelId",
        render: (altRskLvlAlertRskLevelId) => (
        <>
            {
                <Tag color={altRskLvlAlertRskLevelId.alertRskLevelName==="Alto"? "red": altRskLvlAlertRskLevelId.alertRskLevelName==="Medio"? "yellow": "blue"} key={altRskLvlAlertRskLevelId}>
                {altRskLvlAlertRskLevelId.alertRskLevelName.toUpperCase()}
                </Tag>
        
            }
        </>
        ),
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
                    setForkiFields(record,'edit')
                    setItemSelected(record.autoalertId);
                    onShowModal("edit");
                    }}
                />
            </div>
            <Divider type="vertical" style={{ marginTop: 8 }} />
                <div>
                <Popconfirm
                    placement="bottom"
                    title={`Deseas eliminar este elemento #${record.autoalertId}`}
                    onConfirm={() => deleteAutoAlert(record.autoalertId)}
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
        <SectionTitle title={"Alertas automáticas"}>
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
              setForkiFields('','create')
              onShowModal("create");
            }}
          >
            Crear Alerta automática
          </Button>
        </div>
        <Table dataSource={dataSource} columns={columns} />
  
        <Modal
          title={
            typeModal === "create"
              ? `Crear Alerta automática`
              : `Editar Alerta automática # ${itemSelected}`
          }
          visible={showModal}
          onOk={() => {}}
          onCancel={onCancelModal}
          footer={null}
        >
          {formAutoAlert}
        </Modal>
      </SectionTitle>
    );
}
export default AutomaticAlert;
