import React, { useEffect, useState } from "react";
import { fetchApi } from "../../../utils/fetch";
import ModalFormButton from "../button/modalFormButton";
import InputText from "../input/inputText";
import InputNumber from "../input/inputNumber";
import { getLoginCookie } from "../../../utils/cookie";
import InputDate from "../input/inputDate";
import InputDropdown from "../input/inputDropdown";
import errorHanddler from "../../../utils/errorHanddler";
import LoadingAnimation from "../loading/loadingAnimation";

const DiscountForm = ({ id, setModal, disable, label, color }) => {
  const [discount, setDiscount] = useState({});
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState({});

  const getDiscountDetail = async () => {
    try {
      setIsLoading(true);
      const dataDiscount = await fetchApi.get(`/discount/detail/${id}`, {
        headers: {
          Authorization: `Bearer ${await getLoginCookie("user")}`,
        },
      });
      const { data } = dataDiscount.data;
      setDiscount(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const getProductLists = async () => {
    try {
      const dataProduct = await fetchApi.get("/product/list");
      setProduct(dataProduct.data.data.list);
    } catch (error) {
      setErrorMessage({ ...errorMessage, product: error });
      console.error(error);
    }
  };

  useEffect(() => {
    getProductLists();
    if (label?.toLowerCase() !== "create") {
      getDiscountDetail();
    } else {
      setIsLoading(false);
    }
  }, [id]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      switch (label?.toLowerCase()) {
        case "create":
          await fetchApi.post(`/discount/add`, discount, {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          });
          break;
        case "update":
          await fetchApi.put(`/discount/update/${id}`, discount, {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          });
          break;
        case "activate/deactivate":
          await fetchApi.delete(`/discount/delete/${id}`, {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          });
          break;
      }
      setModal(false);
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  return (
    <>
      {isLoading ? (
        <LoadingAnimation />
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-5">
            <InputText
              name={"Name"}
              defaultValue={discount?.name}
              autoFocus
              inputValue={(value) => {
                discount.name = value;
              }}
              disable={disable}
              onError={errorMessage?.name}
            />
            <InputDropdown
              name="Product Name"
              options={product}
              displayKey={"name"}
              valueKey={"_id"}
              disable={disable}
              defaultValue={discount?.product?.name}
              selectedValue={(value) => {
                discount.product = value;
              }}
              onError={errorMessage?.product}
            />
            <InputNumber
              name={"Percentage"}
              defaultValue={discount?.percentage}
              inputValue={(value) => {
                discount.percentage = value;
              }}
              disable={disable}
              onError={errorMessage?.percentage}
            />
            <InputDate
              name={"Start At"}
              defaultValue={discount?.startAt}
              inputValue={(value) => {
                discount.startAt = value;
              }}
              disable={disable}
              onError={errorMessage?.startAt}
            />
            <InputDate
              name={"Expired At"}
              defaultValue={discount?.expiredAt}
              inputValue={(value) => {
                discount.expiredAt = value;
              }}
              disable={disable}
              onError={errorMessage?.expiredAt}
            />
            {label?.toLowerCase() !== "create" && (
              <InputDate
                name={"created At"}
                defaultValue={discount?.createdAt}
                inputValue={(value) => {}}
                disable={true}
                onError={errorMessage?.createdAt}
              />
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
      )}
    </>
  );
};

export default DiscountForm;
