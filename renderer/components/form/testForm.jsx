import React, { useCallback, useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import ModalButton from "../button/modalButton";
import InputText from "../input/inputText";

export default function TestForm({ id, setModal }) {
  const [product, setProduct] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
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
    getProductDetail();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await fetchApi.put(`/product/update/${id}`, product);
      setModal(false);
    } catch (error) {
      if (error.response.data.message === "error validations") {
        setErrorMessage(error.response.data.path);
      }
      console.error(error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputText
          name={"Category"}
          defaultValue={product.category}
          inputValue={(e) => {
            product.category = e;
          }}
          autoFocus
          onError={errorMessage.category}
        />

        <ModalButton
          onDecline={() => {
            setModal(false);
          }}
          buttonName={"Update"}
        />
      </form>
    </>
  );
}
