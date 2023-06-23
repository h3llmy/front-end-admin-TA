import { useEffect, useState } from "react";
import InputSelect from "../input/selectOption";
import { fetchApi } from "../../../utils/fetch";
import errorHanddler from "../../../utils/errorHanddler";
import { getLoginCookie } from "../../../utils/cookie";
import LoadingAnimation from "../loading/loadingAnimation";
import ModalFormButton from "../button/modalFormButton";

const OrderUpdateForm = ({ id, setModal }) => {
  const [order, setOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [newOrderStatus, setNewOrderStatus] = useState(true);
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

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("mantap");
  };

  return isLoading ? (
    <LoadingAnimation />
  ) : (
    <form onSubmit={handleSubmit}>
      <InputSelect
        name={"Order Status"}
        defaultValue={order?.orderStatus}
        options={[
          "ordered",
          "paid", // can progress
          "progress", // can revision
          "revision", // can sended
          "sended", // can revision or accept
          "accept", // can done
          "done",
          "cancelled",
          "failed",
        ]}
        inputValue={(value) => {
          setNewOrderStatus(value);
        }}
        onError={errorMessage?.orderStatus}
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
