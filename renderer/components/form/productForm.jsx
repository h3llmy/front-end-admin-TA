import React, { useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import ModalButton from "../button/modalButton";
import InputText from "../input/inputText";
import InputNumber from "../input/inputNumber";
import InputTextArea from "../input/inputTextArea";
import { getLoginCookie } from "../../../utils/cookie";
import InputMultipleFiles from "../input/inputMultipleFiles";

export default function ProductForm({ id, setModal, disable, label, color }) {
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const getProductDetail = async () => {
    try {
      const [dataProduct] = await Promise.all([
        fetchApi.get(`/product/detail/${id}`),
      ]);
      const { data } = dataProduct.data;
      setProduct(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductDetail();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (label.toLowerCase()) {
        case "update":
          const formData = new FormData();
          formData.append("name", product.name);
          formData.append("price", product.price);
          formData.append("type", product.type);
          formData.append("category", product.category);
          formData.append("maxRevision", product.maxRevision);
          formData.append("dayWork", product.dayWork);
          formData.append("descryption", product.descryption);
          productImages.forEach((productImage) => {
            formData.append("productFile", productImage);
          });

          await fetchApi.put(`/product/update/${id}`, formData, {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          });
          break;
        case "delete":
          await fetchApi.delete(`/product/delete/${id}`, {
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <InputText
            name={"Name"}
            defaultValue={product.name}
            inputValue={(value) => {
              product.name = value;
            }}
            autoFocus
            disable={disable}
            onError={errorMessage.name}
          />
          <InputNumber
            name={"Price"}
            defaultValue={product.price}
            inputValue={(value) => {
              product.price = value;
            }}
            disable={disable}
            onError={errorMessage.price}
          />
          <InputText
            name={"Type"}
            defaultValue={product.type}
            inputValue={(value) => {
              product.type = value;
            }}
            disable={disable}
            onError={errorMessage.type}
          />
          <InputText
            name={"Category"}
            defaultValue={product.category}
            inputValue={(value) => {
              product.category = value;
            }}
            disable={disable}
            onError={errorMessage.category}
          />
          <InputNumber
            name={"Max Revision"}
            defaultValue={product.maxRevision}
            inputValue={(value) => {
              product.maxRevision = value;
            }}
            disable={disable}
            onError={errorMessage.maxRevision}
          />
          <InputNumber
            name={"Day Work"}
            defaultValue={product.dayWork}
            inputValue={(value) => {
              product.dayWork = value;
            }}
            disable={disable}
            onError={errorMessage.dayWork}
          />
        </div>
        <div className="mt-5">
          <InputMultipleFiles
            inputValue={setProductImages}
            defaultValue={product.productUrl}
            name={"Product Display"}
            disable={disable}
          />
        </div>
        <div className="mt-5">
          <InputTextArea
            name={"Descryption"}
            defaultValue={product.descryption}
            inputValue={(value) => {
              product.descryption = value;
            }}
            disable={disable}
            onError={errorMessage.descryption}
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
