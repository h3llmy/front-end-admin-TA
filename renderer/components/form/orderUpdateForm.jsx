import { useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import errorHanddler from "../../../utils/errorHanddler";
import { getLoginCookie } from "../../../utils/cookie";
import LoadingAnimation from "../loading/loadingAnimation";
import ModalFormButton from "../button/modalFormButton";
import InputSingleFile from "../input/inputSingleFIle";

const OrderUpdateForm = ({ id, setModal }) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [previewFile, setPreviewFile] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const cookie = await getLoginCookie("user");
      const orders = await fetchApi.get(`/order/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
      });
      setOrder(orders.data.data);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const cookie = await getLoginCookie("user");
      const createFormData = new FormData();
      if (!previewFile) throw new Error("file is required");
      if (order.orderStatus === "accept") {
        createFormData.append("proudctFile", previewFile);
        await fetchApi.put(`/order/update/done/${id}`, createFormData, {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        });
      } else {
        createFormData.append("productPreview", previewFile);
        await fetchApi.put(`/order/update/preview/${id}`, createFormData, {
          headers: {
            Authorization: `Bearer ${cookie}`,
          },
        });
      }
      setModal(false);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <form onSubmit={handleSubmit}>
      <InputSingleFile
        inputValue={setPreviewFile}
        name={"Preview File"}
        onError={errorMessage}
      />
      <ModalFormButton
        onDecline={() => {
          setModal(false);
        }}
        color={"bg-blue-600 hover:bg-blue-700"}
        buttonName={"Update"}
      />
    </form>
  );
};

export default OrderUpdateForm;
