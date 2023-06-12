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

const Order = () => {
  const [ordersList, setOrdersList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const orders = await fetchApi.get(
        `/order/list?page=${currentPage}&limit=10${
          searchText && `&search=${searchText}`
        }`,
        {
          headers: {
            Authorization: `Bearer ${await getLoginCookie("user")}`,
          },
        }
      );
      orders.data.data.list.forEach((order) => {
        order.customer = order.customer.username;
      });
      setOrdersList(orders.data.data);
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentPage, searchText, errorMessage]);

  return (
    <>
      <SearchForm
        searchTextCallback={(search) => {
          setCurrentPage(1);
          setSearchText(search);
        }}
      />

      <div className="flex justify-end py-3">
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
                id={id}
                disable={true}
                setModal={(event) => {
                  setModal(event);
                }}
              />
            );
          },
          update: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Update Order");
            modalContent(
              <OrderForm
                id={id}
                label={"Update"}
                color={"bg-blue-600 hover:bg-blue-700"}
                setModal={(event) => {
                  fetchOrders();
                  setModal(event);
                }}
              />
            );
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
