import React, { useState } from "react";
import { useParams } from "react-router";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import {
  Table,
  Select,
  Divider,
  Button,
  Modal,
  Col,
  Input,
  Row,
  Popconfirm,
} from "antd";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";
import { useFormik } from "formik";
import LabelInput from "../../components/LabelInput";
import { useSelector } from "react-redux";
import { useCreateLocalConditionMutation, useGetLocalConditionsQuery, useUpdateLocalConditionMutation,useDeleteLocalConditionMutation, useGetPreconditionsQuery, useGetThresholdsQuery, useGetLocalConditionsOfPreconditionQuery } from "../../redux/api/mainAPI";
import './LocalCondition.css'
const { Option } = Select;
const valueTypeData = [
  {title: "Cadena", symbol: "S"},
  {title: "Número", symbol: "N"},
  {title: "Objeto", symbol: "O"}
];

const operatorData = [">","<",">=","<=","=","!="]
const preconData={
  preconId:'-1'
}
const LocalConditionView = () => {
  document.title = "Condiciones Locales";
  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";
  // const userInfo = 'directive';
  const userInfo = permisos.includes("ROLE_Directive-Precondition")
    ? "directive"
    : permisos.includes("ROLE_Admin-Precondition")
    ? "adm"
    : "";
  const [showModal, setShowModal] = useState(false);
  const [itemSelected, setItemSelected] = useState(0);
  const {idPrecondition} = useParams();
  const {data: dataSource, error: requestError, requestLoading} = useGetLocalConditionsOfPreconditionQuery({idPrecondition,userInfo});
  const {data: preconData,  error: preconError, preconLoading} = useGetPreconditionsQuery(userInfo);
  const {data: thresholdData,  error: thresholdError, thresholdLoading} = useGetThresholdsQuery(userInfo);
  const [updateLocalConditionReq, {isLoading: updateLoading}] = useUpdateLocalConditionMutation();
  const [deleteLocalConditionReq, {isLoading: deleteLoading}] = useDeleteLocalConditionMutation();
  const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
      type: "",
    },
    
    onSubmit: async (values) => {
     
        const localConditon = {
          loconId : itemSelected,
          loconColumnname: values.loconColumnname,
          loconKeycolumn: values.loconKeycolumn,
          loconOperator: values.loconOperator,
          loconQuerystring:values.loconQuerystring,
          loconTablename: values.loconTablename,
          loconValuetype:values.loconValuetype,
          preconId : values.preconId,
          thresId: values.thresId
        }
        await updateLocalConditionReq({userInfo,localConditon});
      
    },
  });
  const deleteLocalCondition = async (localconid) =>{
    await deleteLocalConditionReq({localconid,userInfo});
  }
  const onShowModal = (type) => {
    setShowModal(true);
  };

  const onCancelModal = () => {
    setShowModal(false);
  };
  const operatorHandleChange = value => {
    formik.setFieldValue("loconOperator",value);
  };
  const valueTypeHandleChange = value => {
    formik.setFieldValue("loconValuetype",value);
  };
  const preconHandleChange = value => {
    formik.setFieldValue("preconId",value);
  };
  const thesholdHandleChange =value =>{
    formik.setFieldValue("thresId",value);
  }
  const setForkiFields = (values) =>{
      formik.setFieldValue("loconColumnname", values.loconColumnname);
      formik.setFieldValue("loconKeycolumn",values.loconKeycolumn);
      formik.setFieldValue("loconOperator",values.loconOperator);
      formik.setFieldValue("loconQuerystring",values.loconQuerystring);
      formik.setFieldValue("loconTablename",values.loconTablename);
      formik.setFieldValue("loconValuetype",values.loconValuetype);
      formik.setFieldValue("preconId",values.preconId);
      formik.setFieldValue('thresId', values.thresId);
  }
  const formLocalCondition = (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row gutter={10}>
          <Col xs={12} md={12}>
            <LabelInput
              labelText={"Nombre de la columna"}
              nameInput={"loconColumnname"}
            />
            <Input
              placeholder=""
              name="loconColumnname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.loconColumnname}
            />
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>

          <Col xs={12} md={12}>
            <LabelInput
              labelText={"Llave de la columna"}
              nameInput={"loconKeycolumn"}
            />
            <Input
              placeholder=""
              name="loconKeycolumn"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.loconKeycolumn}
            />
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>
        </Row>

        <Row gutter={10} style={{ marginTop: 20 }}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Operador"} nameInput={"loconOperator"} />
            <Select className="ant-select-selection" defaultValue=">" value={formik.values.loconOperator} onChange={operatorHandleChange}>
                {operatorData.map(operator => (
                  <Option key={operator}>{operator}</Option>
                ))}
            </Select>
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Query"} nameInput={"loconQuerystring "} />
            <Input
              placeholder=""
              name="loconQuerystring"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.loconQuerystring}
            />
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>
        </Row>

        <Row gutter={10} style={{ marginTop: 20 }}>
          <Col xs={12} md={12}>
            <LabelInput
              labelText={"Nombre de la tabla"}
              nameInput={"loconTablename"}
            />
            <Input
              placeholder=""
              name="loconTablename"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.loconTablename}
            />
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>
          <Col xs={12} md={12}>
            <LabelInput
              labelText={"Tipo de valor"}
              nameInput={"loconValuetype"}
            />
            <Select className="ant-select-selection" defaultValue="Cadena" value={formik.values.loconValuetype} onChange={valueTypeHandleChange}>
                {valueTypeData.map(valType => (
                  <Option key={valType.symbol}>{valType.title}</Option>
                ))}
            </Select>
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>
        </Row>
        <Row gutter={10} style={{ marginTop: 20 }}>
          <Col xs={12} md={12}>
            <LabelInput
              labelText={"Precondición"}
              nameInput={"preconId"}
            />
            <Select className="ant-select-selection" value={formik.values.preconId} onChange={preconHandleChange}>
                {preconData && preconData.map(precon => (
                  <Option key={precon.preconId}>id:{ precon.preconId} ope: {precon.preconLogicaloperand}</Option>
                ))}
            </Select>
            
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>
          <Col xs={12} md={12}>
          <LabelInput
              labelText={"Threshold"}
              nameInput={"thresId"}
            />
            <Select className="ant-select-selection" value={formik.values.thresId} onChange={thesholdHandleChange}>
                {thresholdData && thresholdData.map(thres => (
                  <Option key={thres.thresholdId}>{thres.thresholdName}</Option>
                ))}
            </Select>
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
              Editar
          </Button>
        </div>
      </form>
    </div>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "loconId",
      key: "loconId",
    },
    {
      title: "Nombre de la columna",
      dataIndex: "loconColumnname",
      key: "loconColumnname",
    },
    {
      title: "Llave de la columna",
      dataIndex: "loconKeycolumn",
      key: "loconKeycolumn",
    },
    {
      title: "Operador",
      dataIndex: "loconOperator",
      key: "loconOperator",
    },
    {
      title: "Query",
      dataIndex: "loconQuerystring",
      key: "loconQuerystring",
    },
    {
      title: "Nombre de la tabla",
      dataIndex: "loconTablename",
      key: "loconTablename",
    },
    {
      title: "Tipo de valor",
      dataIndex: "loconValuetype",
      key: "loconValuetype",
    },
    {
      title: "Precondicion",
      dataIndex: "preconId",
      key: "preconId",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
              <Link to={`/precondition/${record.precondition.preconId}`}> 
                 ID: {record.precondition.preconId}
                </Link>
                </div>
          </div>
        );
      }
    },
    {
      title: "Threshold",
      dataIndex: "treshold",
      key: "threshold",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
              <Link to={`/threshold/${record.threshold.thresholdId}`}>
                 {record.threshold!=null?record.threshold.thresholdName:""}
                </Link>
                </div>
          </div>
        );
      }
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
                  setItemSelected(record.loconId);
                  onShowModal("edit");
                }}
              />
            </div>
            <Divider type="vertical" style={{ marginTop: 8 }} />
            <div>
              <Popconfirm
                placement="bottom"
                title={`Deseas eliminar este elemento #${record.loconId}`}
                onConfirm={() => deleteLocalCondition(record.loconId)}
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
    <SectionTitle title={"Condiciones Locales"}>
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
            setForkiFields('')
            onShowModal("create");
          }}
        >
          Crear Condiciones Locales
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />

      <Modal
        title={`Editar Condiciones Locales # ${itemSelected}`}
        visible={showModal}
        onOk={() => {}}
        onCancel={onCancelModal}
        footer={null}
      >
        {formLocalCondition}
      </Modal>
    </SectionTitle>
  );
};
export default LocalConditionView;
