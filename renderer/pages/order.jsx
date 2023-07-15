import React, { useEffect, useState } from "react";
import Table from "../components/table/table";
import { fetchApi } from "../../utils/fetch";
import SearchForm from "../components/form/searchForm";
import Pagination from "../components/pagination/pagination";
import { getLoginCookie } from "../../utils/cookie";
import OrderForm from "../components/form/orderForm";
import errorHanddler from "../../utils/errorHanddler";
import ModalButton from "../components/button/modalButton";
import ReportForm from "../components/form/reportForm";
import OrderUpdateForm from "../components/form/orderUpdateForm";
import InputSelect from "../components/input/select";

const Order = () => {
  const [ordersList, setOrdersList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const orders = await fetchApi.get(
        `/order/list?page=${currentPage}&limit=10${
          searchText && `&search=${searchText}`
        }${filter && `&orderStatus=${filter}`}`,
        {
          headers: {
            Authorization: `Bearer ${await getLoginCookie("user")}`,
          },
        }
      );
      orders.data.data.list.forEach((order) => {
        order.email = order.customer.email;
        order.customer = order.customer.username;
        order.hiddenSendProduct = !["accept", "progress"].includes(
          order.orderStatus
        );
        order.hiddenProgress = !["paid", "revision"].includes(
          order.orderStatus
        );
      });
      setOrdersList(orders.data.data);
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactClick = (email) => {
    const mailtoLink = `mailto:${email}`;

    window.location.href = mailtoLink;
  };

  const handleProgressClick = async (order) => {
    try {
      await fetchApi.put(
        `/order/update/progress/${order._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${await getLoginCookie("user")}`,
          },
        }
      );
      fetchOrders();
    } catch (error) {
      alert(String(error));
    }
  };

  const handleFilter = (event) => {
    setFilter(event);
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchText, filter, errorMessage]);

  return (
    <>
      <SearchForm
        searchTextCallback={(search) => {
          setCurrentPage(1);
          setSearchText(search);
        }}
      />

      <div className="flex justify-end py-3 space-x-4">
        <div className="w-36">
          <InputSelect
            value={[
              { value: "ordered", display: "Ordered" },
              { value: "paid", display: "Paid" },
              { value: "progress", display: "Progress" },
              { value: "revision", display: "Revision" },
              { value: "sended", display: "Sended" },
              { value: "accept", display: "Accept" },
              { value: "done", display: "Done" },
              { value: "cancelled", display: "Cancelled" },
              { value: "failed", display: "Failed" },
            ]}
            valueCallback={handleFilter}
          />
        </div>
        <ModalButton
          title={"Create Report"}
          label={"Create Report"}
          color={"bg-blue-600 hover:bg-blue-700"}
          content={(setModalContent, setModals) => {
            setModalContent(
              <ReportForm
                label={"Create"}
                color={"bg-blue-600 hover:bg-blue-700"}
                setModal={(value) => {
                  fetchOrders();
                  setCurrentPage(1);
                  setModals(value);
                }}
              />
            );
          }}
        />
      </div>

      <Table
        headers={["customer", "productName", "orderStatus"]}
        data={ordersList?.list}
        errorMessage={errorMessage}
        isLoading={isLoading}
        actions={{
          detail: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Detail Order");
            modalContent(
              <OrderForm
                id={id._id}
                disable={true}
                setModal={(event) => {
                  setModal(event);
                }}
              />
            );
          },
          progress: (id, modalContent, setModal, setModalTitle, onClick) => {
            onClick(handleProgressClick(id));
          },
          sendProduct: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Send Product");
            modalContent(
              <OrderUpdateForm
                id={id._id}
                setModal={(event) => {
                  setModal(event);
                  fetchOrders();
                }}
              />
            );
          },
          contact: (id, modalContent, setModal, setModalTitle, onClick) => {
            onClick(handleContactClick(id.email));
          },
        }}
      />

      <div className="flex flex-row-reverse pt-6">
        {ordersList?.list && (
          <Pagination data={ordersList} onPageChange={setCurrentPage} />
        )}
      </div>
    </>
  );
};

export default Order;
