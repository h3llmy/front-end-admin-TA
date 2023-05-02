import React, { useEffect, useState } from "react";
import Table from "../components/table/table";
import { fetchApi } from "../../utils/fetch";
import SearchForm from "../components/form/searchForm";
import Pagination from "../components/pagination/pagination";
import ProductForm from "../components/form/productForm";
import { getLoginCookie } from "../../utils/cookie";
import { dateConvert } from "../../utils/dateConvert";
import errorHanddler from "../../utils/errorHanddler";

export default function Users() {
  const [usersList, setUsersList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUsers = async () => {
    try {
      const [users] = await Promise.all([
        fetchApi.get(
          `/user/list?page=${currentPage}&limit=10${
            searchText && `&search=${searchText}`
          }`,
          {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          }
        ),
      ]);
      users.data.data.list.forEach((user) => {
        user.isActive = user.isActive ? "Active" : "Not Active";
        user.createdAt = dateConvert(user.createdAt);
      });
      setUsersList(users.data.data);
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [currentPage, searchText, errorMessage]);

  return (
    <>
      <div className="pb-6">
        <SearchForm
          searchTextCallback={(search) => {
            setCurrentPage(1);
            setSearchText(search);
          }}
        />
      </div>

      <Table
        headers={["username", "email", "createdAt", "isActive"]}
        data={usersList?.list}
        errorMessage={errorMessage}
        actions={{
          detail: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Detail Product");
            modalContent(
              <ProductForm id={id} disable={true} setModal={setModal} />
            );
          },
          edit: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Update Product");
            modalContent(
              <ProductForm
                id={id}
                label={"Update"}
                color={"bg-blue-600 hover:bg-blue-700"}
                setModal={(event) => {
                  fetchUsers();
                  setModal(event);
                }}
              />
            );
          },
          delete: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Delete Product");
            modalContent(
              <ProductForm
                id={id}
                disable={true}
                label={"Delete"}
                color={"bg-[#DC2626] hover:bg-[#B91C1C]"}
                setModal={(event) => {
                  fetchUsers();
                  setModal(event);
                }}
              />
            );
          },
        }}
      />

      <div className="flex flex-row-reverse pt-6">
        {usersList?.list && (
          <Pagination data={usersList} onPageChange={setCurrentPage} />
        )}
      </div>
    </>
  );
}
