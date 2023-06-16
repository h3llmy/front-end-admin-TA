import React, { useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import ModalFormButton from "../button/modalFormButton";
import InputText from "../input/inputText";
import InputNumber from "../input/inputNumber";
import InputTextArea from "../input/inputTextArea";
import InputDate from "../input/inputDate";
import { getLoginCookie } from "../../../utils/cookie";
import errorHanddler from "../../../utils/errorHanddler";

const OrderForm = ({ id, setModal, disable, label, color }) => {
  const [order, setOrder] = useState({});
  const [orderStatus, setOrderStatus] = useState("");
  const [errorMessage, setErrorMessage] = useState({});

  const getOrderDetail = async () => {
    try {
      const dataOrder = await fetchApi.get(`/order/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${await getLoginCookie("user")}`,
        },
      });
      const { data } = dataOrder.data;
      data.note = data.revisionNote[0] || data.note;
      setOrder(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOrderDetail();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetchApi.put(`/order/update-status/${id}/${orderStatus}`, order, {
        headers: {
          Authorization: `Bearer ${await getLoginCookie("user")}`,
        },
      });
      setModal(false);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <InputText
            name={"Customer"}
            defaultValue={order?.customer?.username}
            autoFocus
            inputValue={(value) => {
              order.customer.username = value;
            }}
            disable={true}
            onError={errorMessage.customer?.username}
          />
          <InputText
            name={"Product Name"}
            defaultValue={order?.productName}
            inputValue={(value) => {
              order.productName = value;
            }}
            disable={true}
            onError={errorMessage.productName}
          />
          <InputText
            name={"Product Category"}
            defaultValue={order?.productCategory}
            inputValue={(value) => {
              order.productCategory = value;
            }}
            disable={true}
            onError={errorMessage.productCategory}
          />
          <InputNumber
            name={"Price"}
            defaultValue={order?.price}
            inputValue={(value) => {
              order.price = value;
            }}
            disable={true}
            onError={errorMessage.price}
          />
          <InputText
            name={"Order Status"}
            defaultValue={order?.orderStatus}
            inputValue={(value) => {
              setOrderStatus(value);
            }}
            disable={disable && order?.orderStatus !== "done"}
            onError={errorMessage.orderStatus}
          />
          <InputNumber
            name={"Total Revision"}
            defaultValue={order?.totalRevision}
            inputValue={(value) => {
              order.totalRevision = value;
            }}
            disable={true}
            onError={errorMessage.totalRevision}
          />
          <InputNumber
            name={"Max Revision"}
            defaultValue={order?.maxRevision}
            inputValue={(value) => {
              order.maxRevision = value;
            }}
            disable={true}
            onError={errorMessage.maxRevision}
          />
          <InputDate
            name={"created At"}
            defaultValue={order?.createdAt}
            inputValue={() => {}}
            disable={true}
            onError={errorMessage?.createdAt}
          />
        </div>
        <div className="mt-5">
          <InputTextArea
            name={"Note"}
            defaultValue={
              (order.revisionNote?.length > 0 && order.revisionNote?.pop()) ||
              order.note
            }
            inputValue={() => {}}
            disable={true}
            onError={
              errorMessage.revisionNote ||
              (typeof errorMessage == "string" && errorMessage)
            }
          />
        </div>

        <ModalFormButton
          onDecline={() => {
            setModal(false);
          }}
          color={color}
          buttonName={label}
        />
      </form>
    </>
  );
};
export default OrderForm;
