import React, { useEffect, useState } from "react";
import Table from "../components/table/table";
import { fetchApi } from "../../utils/fetch";
import SearchForm from "../components/form/searchForm";
import Pagination from "../components/pagination/pagination";
import { getLoginCookie } from "../../utils/cookie";
import { dateConvert } from "../../utils/dateConvert";
import errorHanddler from "../../utils/errorHanddler";
import UserForm from "../components/form/userForm";

const Users = () => {
  const [usersList, setUsersList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchUsers = async () => {
    try {
      setIsLoading();
      const users = await fetchApi.get(
        `/user/list?page=${currentPage}&limit=10${
          searchText && `&search=${searchText}`
        }`,
        {
          headers: {
            Authorization: `Bearer ${await getLoginCookie("user")}`,
          },
        }
      );
      users.data.data.list.forEach((user) => {
        user.status = user.isActive ? "Active" : "Not Active";
        delete user.isActive;
        user.createdAt = dateConvert(user.createdAt);
      });
      setUsersList(users.data.data);
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    } finally {
      setIsLoading(false);
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
        headers={["username", "email", "createdAt", "status"]}
        data={usersList?.list}
        errorMessage={errorMessage}
        isLoading={isLoading}
        actions={{
          detail: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Detail Product");
            modalContent(
              <UserForm id={id._id} disable={true} setModal={setModal} />
            );
          },
          edit: (id, modalContent, setModal, setModalTitle) => {
            setModalTitle("Update Product");
            modalContent(
              <UserForm
                id={id._id}
                label={"Update"}
                color={"bg-blue-600 hover:bg-blue-700"}
                setModal={(event) => {
                  fetchUsers();
                  setModal(event);
                }}
              />
            );
          },
          "activate/deactivate": (
            id,
            modalContent,
            setModal,
            setModalTitle
          ) => {
            setModalTitle("Update Status");
            modalContent(
              <UserForm
                id={id._id}
                disable={true}
                label={"Update Status"}
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
};

export default Users;
