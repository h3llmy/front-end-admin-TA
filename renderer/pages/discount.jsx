import React, { useEffect, useState } from "react";
import Table from "../components/table/table";
import { fetchApi } from "../../utils/fetch";
import SearchForm from "../components/form/searchForm";
import Pagination from "../components/pagination/pagination";
import { dateConvert } from "../../utils/dateConvert";
import DiscountForm from "../components/form/discountForm";

export default function Discount() {
  const [discountsList, setDiscountsList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDiscounts = async () => {
    try {
      const [discount] = await Promise.all([
        fetchApi.get(
          `/discount/list?page=${currentPage}&limit=10${
            searchText && `&search=${searchText}`
          }`
        ),
      ]);
      discount.data.data.list.forEach((discount) => {
        discount.product = discount.product.name;
        discount.percentage = `${discount.percentage}%`;
        discount.startAt = dateConvert(discount.startAt);
        discount.expiredAt = dateConvert(discount.expiredAt);
      });
      setDiscountsList(discount.data.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error?.response?.data?.message || error.message);
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, [currentPage, searchText, errorMessage]);

  return (
    <>
      <SearchForm
        searchTextCallback={(search) => {
          setCurrentPage(1);
          setSearchText(search);
        }}
      />

      <Table
        headers={["name", "product", "percentage", "startAt", "expiredAt"]}
        data={discountsList?.list}
        errorMessage={errorMessage}
        actions={{
          detail: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Detail Discount");
            modalContent(
              <DiscountForm
                id={id}
                disable={true}
                setModal={(event) => {
                  setModal(event);
                }}
              />
            );
          },
          edit: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Update Discount");
            modalContent(
              <DiscountForm
                id={id}
                label={"Update"}
                color={"bg-blue-600 hover:bg-blue-700"}
                setModal={(event) => {
                  fetchDiscounts();
                  setModal(event);
                }}
              />
            );
          },
          delete: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Delete Discount");
            modalContent(
              <DiscountForm
                id={id}
                disable={true}
                label={"Delete"}
                color={"bg-[#DC2626] hover:bg-[#B91C1C]"}
                setModal={(event) => {
                  fetchDiscounts();
                  setModal(event);
                }}
              />
            );
          },
        }}
      />

      <div className="flex flex-row-reverse pt-6">
        {discountsList?.list && (
          <Pagination data={discountsList} onPageChange={setCurrentPage} />
        )}
      </div>
    </>
  );
}
