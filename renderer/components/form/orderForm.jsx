import React, { useCallback, useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import ModalButton from "../button/modalButton";
import InputText from "../input/inputText";
import InputNumber from "../input/inputNumber";
import InputTextArea from "../input/inputTextArea";
import { getLoginCookie } from "../../../utils/cookie";

export default function OrderForm({ id, setModal, disable, label, color }) {
  const [order, setOrder] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const getOrderDetail = async () => {
    try {
      const [dataOrder] = await Promise.all([
        fetchApi.get(`/order/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${await getLoginCookie("user")}`,
          },
        }),
      ]);
      const { data } = dataOrder.data;
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
      await fetchApi.put(`/order/update/${id}`, order);
      setModal(false);
    } catch (error) {
      if (error?.response?.data?.message === "error validations") {
        setErrorMessage(error.response.data.path);
      }
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <InputText
            name={"Username"}
            defaultValue={order?.customer?.username}
            autoFocus
            inputValue={(value) => {
              order.customer.username = value;
            }}
            disable={true}
            onError={errorMessage.name}
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
          <InputText
            name={"Product Type"}
            defaultValue={order?.productType}
            inputValue={(value) => {
              order.productType = value;
            }}
            disable={true}
            onError={errorMessage.productType}
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
              order.orderStatus = value;
            }}
            disable={true}
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
        </div>
        <div className="mt-5">
          <InputTextArea
            name={"Note"}
            defaultValue={
              (order.revisionNote?.length > 0 && order.revisionNote?.pop()) ||
              order.note
            }
            inputValue={(value) => {
              order.note = value;
            }}
            disable={disable}
            onError={errorMessage.note}
          />
        </div>

        <ModalButton
          onDecline={() => {
            setModal(false);
          }}
          color={color}
          buttonName={label}
        />
      </form>
    </>
  );
}
