import React, { useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import ModalFormButton from "../button/modalFormButton";
import InputText from "../input/inputText";
import { getLoginCookie } from "../../../utils/cookie";
import errorHanddler from "../../../utils/errorHanddler";
import InputDate from "../input/inputDate";
import Table from "../table/table";
import { dateConvert } from "../../../utils/dateConvert";

const UserForm = ({ id, setModal, disable, label, color }) => {
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const getUserDetail = async () => {
    try {
      const dataUser = await fetchApi.get(`/user/detail?userId=${id}`, {
        headers: {
          Authorization: `Bearer ${await getLoginCookie("user")}`,
        },
      });
      const { data } = dataUser.data;
      data.collections.forEach((collection) => {
        collection.createdAt = dateConvert(collection.createdAt);
      });
      data.isActive = data.isActive ? "Active" : "Not Active";
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserDetail();
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (label.toLowerCase()) {
        case "update":
          await fetchApi.put(`/discount/update/${id}`, discount, {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          });
          break;
        case "update status":
          await fetchApi.put(
            `/user/update-status/${id}`,
            {},
            {
              headers: {
                Authorization: `Bearer ${await getLoginCookie("user")}`,
              },
            }
          );
          break;
      }
      setModal(false);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-5">
          <InputText
            name={"Username"}
            defaultValue={user?.username}
            autoFocus
            inputValue={(value) => {
              user.username = value;
            }}
            disable={disable}
            onError={errorMessage?.username}
          />
          <InputText
            name={"Email"}
            defaultValue={user?.email}
            inputValue={(value) => {
              user.email = value;
            }}
            disable={disable}
            onError={errorMessage?.email}
          />
          <InputText
            name={"Status"}
            defaultValue={user?.isActive}
            inputValue={(value) => {
              user.isActive = value;
            }}
            disable={true}
            onError={errorMessage?.isActive}
          />
          <InputDate
            name={"Created At"}
            defaultValue={user?.createdAt}
            inputValue={(value) => {
              user.createdAt = value;
            }}
            disable={true}
            onError={errorMessage?.createdAt}
          />
        </div>
        {user?.collections &&
          user?.collections.length > 0 &&
          label?.toLowerCase() !== "update status" && (
            <div className="mt-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Collections
              </label>
              <Table
                headers={[
                  "productUrl",
                  "productName",
                  "productCategory",
                  "productType",
                  "createdAt",
                ]}
                data={user?.collections}
                stringLength={100}
              />
            </div>
          )}

        <ModalFormButton
          onDecline={() => {
            setModal(false);
          }}
          color={color}
          buttonName={label}
        />
      </form>
    </>
  );
};

export default UserForm;
