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
  Row,
  Popconfirm,
} from "antd";
import { useSelector } from "react-redux";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { primaryColor } from "../../commons/constants/StylesConstants";
import { useFormik } from "formik";
import LabelInput from "../../components/LabelInput";
import { useGetPreconditionQuery, useDeletePreconditionMutation, useUpdatePreconditionMutation } from "../../redux/api/mainAPI";

const {Option} = Select
const operators = ['OR', 'AND'];
const PreconditionView = () => {
  const { user } = useSelector((state) => state.userLogin);
  const permisos = user?.role?.split(",") ?? "";
  // const userInfo = 'directive';
  const userInfo = permisos.includes("ROLE_Directive-Precondition")
    ? "directive"
    : permisos.includes("ROLE_Admin-Precondition")
    ? "adm"
    : "";
    const [showModal, setShowModal] = useState(false);
    const {idPrecondition} = useParams();
    const [itemSelected, setItemSelected] = useState();
    const {data:preconReq, error : getError,isLoading,isFetching} = useGetPreconditionQuery({idPrecondition,userInfo});
    const [updatePreconditionReq, {isLoading: updateLoding}] = useUpdatePreconditionMutation();
    const [deletePreconditionReq, {isLoading: deleteLoding}] = useDeletePreconditionMutation();
    console.log(isLoading);
    const formik = useFormik({
    initialValues: {
      name: "",
      value: "",
      type: "",
    },
    onSubmit: async (values)  => {
        const preconditionToEdit={
          preconId: itemSelected,
          preconLogicaloperand: values.preconLogicaloperand
        }
       await updatePreconditionReq({preconditionToEdit,userInfo});
    },
  });
  const deletePrecondition = async (precondId) =>{
    await deletePreconditionReq({precondId,userInfo});
  }
  const onShowModal = (type) => {
    setShowModal(true);
  };
  const logOperHandlechange = value => {
    formik.setFieldValue("preconLogicaloperand", value);
  };
  const onCancelModal = () => {
    setShowModal(false);
  };

  const formPrecondition = (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Row gutter={10}>
          <Col xs={12} md={12}>
            <LabelInput labelText={"Operador lógico"} nameInput={"preconLogicaloperand"} />
            <Select value={formik.values.preconLogicaloperand} onChange={logOperHandlechange}>
                {operators.map(operator => (
                  <Option key={operator}>{operator}</Option>
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
          <Button htmlType="submit" type="primary">Editar</Button>
        </div>
      </form>
    </div>
  );

  const columns = [
    {
      title: "ID",
      dataIndex: "preconId",
      key: "preconId",
    },
    {
      title: "Operando lógico",
      dataIndex: "preconLogicaloperand",
      key: "preconLogicaloperand",
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
                  formik.setFieldValue('preconLogicaloperand', record.preconLogicaloperand)
                  setItemSelected(record.preconId);
                  onShowModal();
                }}
              />
            </div>
            <Divider type="vertical" style={{ marginTop: 8 }} />
            <div>
              <Popconfirm
                placement="bottom"
                title={`Deseas eliminar este elemento #${record.preconId}`}
                onConfirm={()=>deletePrecondition(record.preconId)}
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
  if(preconReq){
    var dataSource=[{preconId:preconReq.preconId, preconLogicaloperand: preconReq.preconLogicaloperand}];
  }
    return (
        <SectionTitle title={"Precondiciones"}>
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
        title={`Editar Precondición # ${itemSelected}`}
        visible={showModal}
        onOk={() => {}}
        onCancel={onCancelModal}
        footer={null}
      >
        {formPrecondition}
      </Modal>
    </SectionTitle>
    );
}

export default PreconditionView;