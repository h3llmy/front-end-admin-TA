import React, { useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import ModalFormButton from "../button/modalFormButton";
import InputText from "../input/inputText";
import InputNumber from "../input/inputNumber";
import InputTextArea from "../input/inputTextArea";
import { getLoginCookie } from "../../../utils/cookie";
import InputMultipleFiles from "../input/inputMultipleFiles";
import errorHanddler from "../../../utils/errorHanddler";
import InputDropdown from "../input/inputDropdown";

const ProductForm = ({ id, setModal, disable, label, color }) => {
  const [product, setProduct] = useState({});
  const [categories, setCategories] = useState({});
  const [productImages, setProductImages] = useState({});
  const [uploadProgress, setUploadProgress] = useState(0);
  const [errorMessage, setErrorMessage] = useState({});

  const getCategories = async () => {
    try {
      const getCategories = await fetchApi.get("/categories/list");
      setCategories(getCategories.data.data.list);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
      console.error(error);
    }
  };

  const getProductDetail = async () => {
    try {
      const [dataProduct] = await Promise.all([
        fetchApi.get(`/product/detail/${id}`),
      ]);
      const { data } = dataProduct.data;
      setProduct(data);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
      console.error(error);
    }
  };

  useEffect(() => {
    getCategories();
    if (label?.toLowerCase() !== "create") {
      getProductDetail();
    }
  }, [id]);

  const getFormData = () => {
    const createFormData = new FormData();

    const checkValue = (key, value) => {
      if (value !== null && value !== undefined) {
        createFormData.append(key, value);
      }
    };

    checkValue("name", product.name);
    checkValue("price", product.price);
    checkValue("category", product.category);
    checkValue("maxRevision", product.maxRevision);
    checkValue("dayWork", product.dayWork);
    checkValue("descryption", product.descryption);

    productImages.forEach((productImage) => {
      checkValue("productFile", productImage);
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
          <InputDropdown
            name="Category"
            options={categories}
            displayKey={"name"}
            valueKey={"_id"}
            disable={disable}
            defaultValue={product?.category?.name}
            selectedValue={(value) => {
              product.category = value;
            }}
            onError={errorMessage?.category}
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
            downloadAble={true}
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
};

export default ProductForm;
