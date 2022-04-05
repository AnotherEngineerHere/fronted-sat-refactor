import React, { useState } from "react";
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
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";
import { useFormik } from "formik";
import LabelInput from "../../components/LabelInput";
import { useSelector } from "react-redux";
import { useCreateRemoteConditionMutation, useDeleteRemoteConditionMutation, useGetPreconditionsQuery, useGetRemoteConditionQuery, useGetRemoteConditionsOfPreconditionQuery, useGetThresholdsQuery, useUpdateRemoteConditionMutation } from "../../redux/api/mainAPI";
import './RemoteCondition.css'
const {Option} = Select
const operatorData = [">","<",">=","<=","=","!="]
const valueTypeData = [
  {title: "Cadena", symbol: "S"},
  {title: "Número", symbol: "N"},
  {title: "Objeto", symbol: "O"}
];

const RemoteConditionView = () => {
  document.title = "Condiciones Remotas";
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
  const {data: dataSource, error: requestError, requestLoading} = useGetRemoteConditionsOfPreconditionQuery({idPrecondition,userInfo});
  const {data: preconData,  error: preconError, preconLoading} = useGetPreconditionsQuery(userInfo);
  const {data: thresholdData,  error: thresholdError, thresholdLoading} = useGetThresholdsQuery(userInfo);
  const [updateRemoteConditionReq, {isLoading: updateLoading}] = useUpdateRemoteConditionMutation();
  const [deleteRmoteConditionReq, {isLoading: deleteLoading}] = useDeleteRemoteConditionMutation();
  
  const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
      type: "",
    },
    onSubmit: async (values) => {
    
        const remoteCondition = {
          remconId : itemSelected,
          remconDelegatename: values.remconDelegatename,
          remconMethodname: values.remconMethodname,
          remconParametername: values.remconParametername,
          remconReturnvaluetype:values.remconReturnvaluetype,
          preconId : values.preconId,
          thresholdId : values.thresholdId
        }
        await updateRemoteConditionReq({userInfo,remoteCondition});
      
    },
  });
  const deleteRemotecondition = async (remoteId) =>{
    await deleteRmoteConditionReq({remoteId,userInfo});
  }
  const onShowModal = (type) => {
    setShowModal(true);
  };

  const onCancelModal = () => {
    setShowModal(false);
  }
  const preconHandleChange = value => {
    formik.values.preconId = value;
  };
  const valueTypeHandleChange = value => {
    formik.values.remconReturnvaluetype = value;
  };
  const thesholdHandleChange =value =>{
    formik.setFieldValue("thresholdId",value);
  }
  const setForkiFields = (values, from) =>{
    
      formik.setFieldValue("remconDelegatename", values.remconDelegatename);
      formik.setFieldValue("remconMethodname",values.remconMethodname);
      formik.setFieldValue("remconParametername",values.remconParametername);
      formik.setFieldValue("remconReturnvaluetype",values.remconReturnvaluetype);
      formik.setFieldValue("preconId",values.preconId);
      formik.setFieldValue("thresholdId",values.thresholdId);
  }
  const formRemoteCondition = (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row gutter={10}>
          <Col xs={12} md={12}>
            <LabelInput
              labelText={"Nombre delegado"}
              nameInput={"remconDelegatename"}
            />
            <Input
              placeholder=""
              name="remconDelegatename"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.remconDelegatename}
            />
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>

          <Col xs={12} md={12}>
            <LabelInput
              labelText={"Nombre parámetro"}
              nameInput={"remconParametername"}
            />
            <Input
              placeholder=""
              name="remconParametername"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.remconParametername}
            />
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>
        </Row>

        <Row gutter={10} style={{ marginTop: 20 }}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Nombre método"} nameInput={"remconMethodname"} />
            <Input
              placeholder=""
              name="remconMethodname"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.remconMethodname}
            />
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>
          <Col xs={12} md={12}>
            <LabelInput
              labelText={"Valor tipo"}
              nameInput={"remconReturnvaluetype"}
            />
           <Select className="ant-select-selection" value={formik.values.remconReturnvaluetype} onChange={valueTypeHandleChange}>
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
                {preconData && preconData.map(valType => (
                  <Option key={valType.preconId}>id:{ valType.preconId} ope: {valType.preconLogicaloperand}</Option>
                ))}
            </Select>
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>
          <Col xs={12} md={12}>
          <LabelInput
              labelText={"Threshold"}
              nameInput={"thresholdId"}
            />
            <Select className="ant-select-selection" value={formik.values.thresholdId} onChange={thesholdHandleChange}>
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
      dataIndex: "remconId",
      key: "remconId",
    },
    {
      title: "Nombre delegado",
      dataIndex: "remconDelegatename",
      key: "remconDelegatename",
    },
    {
      title: "Nombre parámetro",
      dataIndex: "remconParametername",
      key: "remconParametername",
    },
    {
      title: "Nombre método",
      dataIndex: "remconMethodname",
      key: "remconMethodname",
    },
    {
      title: "Valor tipo",
      dataIndex: "remconReturnvaluetype",
      key: "remconReturnvaluetype",
    },
    {
      title: "Precondicion",
      dataIndex: "preconId",
      key: "preconId",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", flexDirection: "row" }}>
              <div>
              <Link to={`/precondition/`}> 
                 
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
                 {record.threshold.thresholdName}
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
                  setItemSelected(record.remconId);
                  onShowModal("edit");
                }}
              />
            </div>
            <Divider type="vertical" style={{ marginTop: 8 }} />
            <div>
              <Popconfirm
                placement="bottom"
                title={`Deseas eliminar este elemento #${record.remconId}`}
                onConfirm={() => deleteRemotecondition(record.remconId)}
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
    <SectionTitle title={"Condiciones Remotas"}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          marginBottom: 10,
        }}
      >
      </div>
      <Table dataSource={dataSource} columns={columns} />

      <Modal
        title={
           `Editar Condiciones Remotas # ${itemSelected}`
        }
        visible={showModal}
        onOk={() => {}}
        onCancel={onCancelModal}
        footer={null}
      >
        {formRemoteCondition}
      </Modal>
    </SectionTitle>
  );
};
export default RemoteConditionView;
