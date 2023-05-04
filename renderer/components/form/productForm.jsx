import React, { useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import ModalFormButton from "../button/modalFormButton";
import InputText from "../input/inputText";
import InputNumber from "../input/inputNumber";
import InputTextArea from "../input/inputTextArea";
import { getLoginCookie } from "../../../utils/cookie";
import InputMultipleFiles from "../input/inputMultipleFiles";
import errorHanddler from "../../../utils/errorHanddler";

export default function ProductForm({ id, setModal, disable, label, color }) {
  const [product, setProduct] = useState({});
  const [productImages, setProductImages] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
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
    if (label?.toLowerCase() !== "create") {
      getProductDetail();
    }
  }, [id]);

  const getFormData = () => {
    const createFormData = new FormData();
    createFormData.append("name", product.name);
    createFormData.append("price", product.price);
    createFormData.append("type", product.type);
    createFormData.append("category", product.category);
    createFormData.append("maxRevision", product.maxRevision);
    createFormData.append("dayWork", product.dayWork);
    createFormData.append("descryption", product.descryption);
    productImages.forEach((productImage) => {
      createFormData.append("productFile", productImage);
    });

    return createFormData;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (label?.toLowerCase()) {
        case "create":
          await fetchApi.post(`/product/add`, getFormData(), {
            onUploadProgress: (progressEvent) => {
              const percentage = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentage);
            },
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          });
          break;
        case "update":
          await fetchApi.put(`/product/update/${id}`, getFormData(), {
            onUploadProgress: (progressEvent) => {
              const percentage = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              setUploadProgress(percentage);
            },
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
      errorHanddler(error, setErrorMessage);
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
            process={uploadProgress}
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
}
