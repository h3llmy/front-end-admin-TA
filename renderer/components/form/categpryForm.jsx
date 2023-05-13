import React, { useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import ModalFormButton from "../button/modalFormButton";
import InputText from "../input/inputText";
import { getLoginCookie } from "../../../utils/cookie";
import errorHanddler from "../../../utils/errorHanddler";
import InputNumber from "../input/inputNumber";
import InputDate from "../input/inputDate";

export default function CategoryForm({ id, setModal, disable, label, color }) {
  const [categories, setCategories] = useState({});
  const [errorMessage, setErrorMessage] = useState({});

  const getCategoriesDetail = async () => {
    try {
      const [dataCategories] = await Promise.all([
        fetchApi.get(`/categories/detail/${id}`, {
          headers: {
            Authorization: `Bearer ${await getLoginCookie("user")}`,
          },
        }),
      ]);
      const { data } = dataCategories.data;
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (label?.toLowerCase() !== "create") {
      getCategoriesDetail();
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (label?.toLowerCase()) {
        case "create":
          await fetchApi.post("/categories/add", categories, {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          });
          break;
        case "update":
          await fetchApi.put(`/categories/update/${id}`, categories, {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          });
          break;
        case "delete":
          await fetchApi.delete(`/categories/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          });
          break;

        default:
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
            name={"Name"}
            defaultValue={categories?.name}
            autoFocus
            inputValue={(value) => {
              categories.name = value;
            }}
            disable={disable}
            onError={errorMessage.name}
          />
          {label?.toLowerCase() !== "create" &&
            label?.toLowerCase() !== "update" && (
              <>
                <InputNumber
                  name={"Sold"}
                  defaultValue={categories.sold}
                  inputValue={(value) => {
                    categories.sold = value;
                  }}
                  disable={true}
                  onError={errorMessage.sold}
                />
                <InputDate
                  name={"created At"}
                  defaultValue={categories?.createdAt}
                  inputValue={(value) => {}}
                  disable={true}
                  onError={errorMessage?.createdAt}
                />
              </>
            )}
        </div>

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
}
