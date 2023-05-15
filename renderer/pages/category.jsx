import React, { useEffect, useState } from "react";
import Table from "../components/table/table";
import { fetchApi } from "../../utils/fetch";
import SearchForm from "../components/form/searchForm";
import Pagination from "../components/pagination/pagination";
import { getLoginCookie } from "../../utils/cookie";
import errorHanddler from "../../utils/errorHanddler";
import ModalButton from "../components/button/modalButton";
import { dateConvert } from "../../utils/dateConvert";
import CategoryForm from "../components/form/categpryForm";

const Category = () => {
  const [categorysList, setCategoryList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchCategorys = async () => {
    try {
      const [categorys] = await Promise.all([
        fetchApi.get(
          `/categories/list?page=${currentPage}&limit=10${
            searchText && `&search=${searchText}`
          }`,
          {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          }
        ),
      ]);
      categorys.data.data.list.map((category) => {
        category.createdAt = dateConvert(category.createdAt);
        category.sold = String(category?.sold);
      });
      setCategoryList(categorys.data.data);
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  useEffect(() => {
    fetchCategorys();
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
          title={"Create Category"}
          label={"Create Category"}
          color={"bg-blue-600 hover:bg-blue-700"}
          content={(setModalContent, setModals) => {
            setModalContent(
              <CategoryForm
                label={"Create"}
                color={"bg-blue-600 hover:bg-blue-700"}
                setModal={(value) => {
                  fetchCategorys();
                  setCurrentPage(1);
                  setModals(value);
                }}
              />
            );
          }}
        />
      </div>

      <Table
        headers={["name", "createdAt", "sold"]}
        data={categorysList?.list}
        errorMessage={errorMessage}
        actions={{
          detail: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Detail Product");
            modalContent(
              <CategoryForm id={id} disable={true} setModal={setModal} />
            );
          },
          edit: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Update Product");
            modalContent(
              <CategoryForm
                id={id}
                label={"Update"}
                color={"bg-blue-600 hover:bg-blue-700"}
                setModal={(event) => {
                  fetchCategorys();
                  setModal(event);
                }}
              />
            );
          },
          delete: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Delete Product");
            modalContent(
              <CategoryForm
                id={id}
                disable={true}
                label={"Delete"}
                color={"bg-[#DC2626] hover:bg-[#B91C1C]"}
                setModal={(event) => {
                  fetchCategorys();
                  setModal(event);
                }}
              />
            );
          },
        }}
      />

      <div className="flex flex-row-reverse pt-6">
        {categorysList?.list && (
          <Pagination data={categorysList} onPageChange={setCurrentPage} />
        )}
      </div>
    </>
  );
};

export default Category;
