import React, { useCallback, useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import ModalButton from "../button/modalButton";
import InputText from "../input/inputText";
import InputNumber from "../input/inputNumber";
import { getLoginCookie } from "../../../utils/cookie";
import InputDate from "../input/inputDate";
import InputDropdown from "../input/inputDropdown";

export default function DiscountForm({ id, setModal, disable, label, color }) {
  const [discount, setDiscount] = useState({});
  const [product, setProduct] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const getDiscountDetail = async () => {
    try {
      const [dataDiscount] = await Promise.all([
        fetchApi.get(`/discount/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${await getLoginCookie("user")}`,
          },
        }),
      ]);
      const { data } = dataDiscount.data;
      setDiscount(data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProductLists = async () => {
    try {
      const [dataProduct] = await Promise.all([fetchApi.get("/product/list")]);
      setProduct(dataProduct.data.data.list);
    } catch (error) {
      setErrorMessage({ ...errorMessage, product: error });
      console.error(error);
    }
  };

  useEffect(() => {
    getProductLists();
    getDiscountDetail();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (label.toLowerCase()) {
        case "update":
          await fetchApi.put(`/discount/update/${id}`, discount, {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          });
          break;
        case "delete":
          await fetchApi.delete(`/discount/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          });
          break;
      }
      setModal(false);
    } catch (error) {
      if (error?.response?.data?.message === "error validations") {
        setErrorMessage(error.response.data.path);
      }
      console.error(error);
    }
  };

  const [selectedValue, setSelectedValue] = useState("");
  const [inputValue, setInputValue] = useState("Option 2");
  console.log(selectedValue);
  const options = [
    { _id: "1", name: "Option 1" },
    { _id: "2", name: "Option 2" },
    { _id: "3", name: "Option 3" },
    { _id: "4", name: "Option 4" },
  ];

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <InputText
            name={"Name"}
            defaultValue={discount?.name}
            autoFocus
            inputValue={(value) => {
              discount.name = value;
            }}
            disable={disable}
            onError={errorMessage.name}
          />
          {/* fix this with drop down */}
          <InputDropdown
            name="Product Name"
            options={product}
            displayKey={"name"}
            valueKey={"_id"}
            disable={disable}
            defaultValue={"Lucious16"}
            selectedValue={setSelectedValue}
            onError={errorMessage.product}
          />
          {/* <InputText
            name={"Product Name"}
            defaultValue={discount?.product?.name}
            inputValue={(value) => {
              discount.product.name = value;
            }}
            disable={disable}
            onError={errorMessage.product}
          /> */}
          <InputNumber
            name={"Percentage"}
            defaultValue={discount?.percentage}
            inputValue={(value) => {
              discount.percentage = value;
            }}
            disable={disable}
            onError={errorMessage.percentage}
          />
          <InputDate
            name={"Start At"}
            defaultValue={discount?.startAt}
            inputValue={(value) => {
              console.log(value);
              discount.startAt = value;
            }}
            disable={disable}
            onError={errorMessage.startAt}
          />
          <InputDate
            name={"Expired At"}
            defaultValue={discount?.expiredAt}
            inputValue={(value) => {
              console.log(value);
              discount.expiredAt = value;
            }}
            disable={disable}
            onError={errorMessage.expiredAt}
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
