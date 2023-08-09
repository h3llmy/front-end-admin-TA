import React, { useEffect, useState } from "react";
import Table from "../components/table/table";
import { fetchApi } from "../../utils/fetch";
import SearchForm from "../components/form/searchForm";
import Pagination from "../components/pagination/pagination";
import { dateConvert } from "../../utils/dateConvert";
import DiscountForm from "../components/form/discountForm";
import errorHanddler from "../../utils/errorHanddler";
import ModalButton from "../components/button/modalButton";
import { getLoginCookie } from "../../utils/cookie";

const Discount = () => {
  const [discountsList, setDiscountsList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchDiscounts = async () => {
    try {
      setIsLoading(true);
      const cookie = await getLoginCookie("user");
      const discount = await fetchApi.get(`/discount/list`, {
        headers: {
          Authorization: `Bearer ${cookie}`,
        },
        params: {
          page: currentPage,
          limit: 10,
          search: searchText,
          isActive: isActive,
        },
      });
      discount.data.data.list.forEach((discount) => {
        discount.product = discount?.product?.name;
        discount.percentage = `${discount?.percentage}%`;
        discount.startAt = dateConvert(discount?.startAt);
        discount.expiredAt = dateConvert(discount?.expiredAt);
      });
      setDiscountsList(discount.data.data);
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDiscounts();
  }, [currentPage, searchText, errorMessage, isActive]);

  return (
    <>
      <SearchForm
        searchTextCallback={(search) => {
          setCurrentPage(1);
          setSearchText(search);
        }}
      />

      <div className="flex justify-end py-3">
        <button
          type="button"
          className={`bg-blue-600 hover:bg-blue-700 px-4 py-1 text-white rounded-lg focus:outline-none focus:shadow-outline-gray mr-4`}
          onClick={() => setIsActive(isActive ? false : true)}
        >
          {isActive ? "Active Discount" : "All Discount"}
        </button>
        <ModalButton
          title={"Create Discount"}
          label={"Create Discount"}
          color={"bg-blue-600 hover:bg-blue-700"}
          content={(setModalContent, setModals) => {
            setModalContent(
              <DiscountForm
                label={"Create"}
                color={"bg-blue-600 hover:bg-blue-700"}
                setModal={(value) => {
                  fetchDiscounts();
                  setCurrentPage(1);
                  setModals(value);
                }}
              />
            );
          }}
        />
      </div>

      <Table
        headers={["name", "product", "percentage", "startAt", "expiredAt"]}
        data={discountsList?.list}
        errorMessage={errorMessage}
        isLoading={isLoading}
        actions={{
          detail: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Detail Discount");
            modalContent(
              <DiscountForm
                id={id._id}
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
                id={id._id}
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
                id={id._id}
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
};

export default Discount;
