import React, {useState} from "react"
import { useParams } from "react-router";
import SectionTitle from "../../commons/layouts/SectionTile/SectionTitle";
import {
  Table,
  Divider,
  Select,
  Button,
  Modal,
  Col,
  Input,
  Row,
  Popconfirm,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";
import { useFormik } from "formik";
import {useSelector} from "react-redux";
import LabelInput from "../../components/LabelInput";
import { useUpdateThresholdMutation, useDeleteThresholdMutation, useGetThresholdQuery } from "../../redux/api/mainAPI";

const {Option} = Select
const valueTypeData = [
  {title: "Cadena", symbol: "S"},
  {title: "Número", symbol: "N"},
  {title: "Objeto", symbol: "O"}
];

const ThresholdView = () => {
  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";
  // const userInfo = 'directive';
  const userInfo = permisos.includes("ROLE_Directive-Threshold")
    ? "directive"
    : permisos.includes("ROLE_Admin-Threshold")
    ? "adm"
    : "";
    const [showModal, setShowModal] = useState(false);
    const {idThreshold} = useParams();
    const [itemSelected, setItemSelected] = useState();
    const {data:thresholdReq, error : getError,isLoading,isFetching} = useGetThresholdQuery({idThreshold,userInfo});
    const [updateThreshold, { isLoading: updateLoading }, ] = useUpdateThresholdMutation();
    const [deleteThresholdReq, { isLoading: deleteLoading }, ] = useDeleteThresholdMutation();
    
    const formik = useFormik({
        initialValues: {
          name: "",
          value: "",
          type: "",
        },
        onSubmit: async (values) => {
          
            const thresholdToEdit ={
              thresholdName: values.thresholdName,
              thresholdValue: values.thresholdValue,
              thresholdValueType: values.thresholdValueType,
              thresholdId : itemSelected
            }
            await updateThreshold(thresholdToEdit);
          
        },
      });
    
    const deleteThreshold = async (thresholdId) =>{
        await deleteThresholdReq(thresholdId);
      }
      const onShowModal = (type) => {
        setShowModal(true);
      };
      const setForkiFields = (values) =>{
            formik.setFieldValue("thresholdName", values.thresholdName);
            formik.setFieldValue("thresholdValue", values.thresholdValue);
            formik.setFieldValue("thresholdValueType", values.thresholdValueType);
      }
      const valueTypeHandleChange = value => {
        formik.setFieldValue("thresholdValueType", value);
      };
      const onCancelModal = () => {
        setShowModal(false);
      };

  const formThreshold = (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row gutter={10}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Nombre"} nameInput={"thresholdName"} />
            <Input
              placeholder=""
              name="thresholdName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.thresholdName}
            />
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>

          <Col xs={12} md={12}>
            <LabelInput labelText={"Valor"} nameInput={"thresholdValue "} />
            <Input
              placeholder=""
              name="thresholdValue"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.thresholdValue}
            />
            {/*<div>
                <p style={{ color: "red", marginTop: 10 }}>Mensaje de error </p>
              </div>*/}
          </Col>
        </Row>

        <Row gutter={10} style={{ marginTop: 20 }}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Tipo"} nameInput={"thresholdValueType"} />
            <Select defaultValue="N" value={formik.values.thresholdValueType} onChange={valueTypeHandleChange}>
                {valueTypeData.map(valType => (
                  <Option key={valType.symbol}>{valType.title}</Option>
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
            { `Editar`}
          </Button>
        </div>
      </form>
    </div>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "thresholdId",
      key: "thresholdId",
    },
    {
      title: "Nombre",
      dataIndex: "thresholdName",
      key: "thresholdName",
    },
    {
      title: "Valor",
      dataIndex: "thresholdValue",
      key: "thresholdValue",
    },
    {
      title: "Tipo",
      dataIndex: "thresholdValueType",
      key: "thresholdValueType",
    
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
                  setForkiFields(record,)
                  setItemSelected(record.thresholdId)
                  onShowModal();
                }}
              />
            </div>
            <Divider type="vertical" style={{ marginTop: 8 }} />
            <div>
              <Popconfirm
                placement="bottom"
                title={`Deseas eliminar este elemento #${record.thresholdId}`}
                onConfirm={() => {deleteThreshold(record.thresholdId)}}
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
  if(thresholdReq){
    var dataSource=[{thresholdId:thresholdReq.thresholdId, thresholdName: thresholdReq.thresholdName, thresholdValue:thresholdReq.thresholdValue, thresholdValueType:thresholdReq.thresholdValueType}];
  }
    return (
        <SectionTitle title={"Threshold"}>
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
              onShowModal();
            }}
          >
          </Button>
        </div>
        {thresholdReq&&<Table dataSource={dataSource} columns={columns} />}
  
        <Modal
          title={ `Editar Threshold # ${itemSelected}`
          }
          visible={showModal}
          onOk={() => {}}
          onCancel={onCancelModal}
          footer={null}
        >
          {formThreshold}
        </Modal>
      </SectionTitle>
    );
}

export default ThresholdView;