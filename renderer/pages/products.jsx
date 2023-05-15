import React, { useEffect, useState } from "react";
import Table from "../components/table/table";
import { fetchApi } from "../../utils/fetch";
import SearchForm from "../components/form/searchForm";
import Pagination from "../components/pagination/pagination";
import ProductForm from "../components/form/productForm";
import errorHanddler from "../../utils/errorHanddler";
import { getLoginCookie } from "../../utils/cookie";
import ModalButton from "../components/button/modalButton";

const Product = () => {
  const [productsList, setProductsList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const fetchProducts = async () => {
    try {
      const [products] = await Promise.all([
        fetchApi.get(
          `/product/list?page=${currentPage}&limit=10${
            searchText && `&search=${searchText}`
          }`,
          {
            headers: {
              Authorization: `Bearer ${await getLoginCookie("user")}`,
            },
          }
        ),
      ]);
      products.data.data.list.map((product) => {
        product.category = product.category.name;
      });
      setProductsList(products.data.data);
      setErrorMessage("");
    } catch (error) {
      errorHanddler(error, setErrorMessage);
    }
  };

  useEffect(() => {
    fetchProducts();
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
          title={"Create Product"}
          label={"Create Product"}
          color={"bg-blue-600 hover:bg-blue-700"}
          content={(setModalContent, setModals) => {
            setModalContent(
              <ProductForm
                label={"Create"}
                color={"bg-blue-600 hover:bg-blue-700"}
                setModal={(value) => {
                  fetchProducts();
                  setCurrentPage(1);
                  setModals(value);
                }}
              />
            );
          }}
        />
      </div>

      <Table
        headers={["name", "category", "price", "maxRevision"]}
        data={productsList?.list}
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
                  fetchProducts();
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
                  fetchProducts();
                  setModal(event);
                }}
              />
            );
          },
        }}
      />

      <div className="flex flex-row-reverse pt-6">
        {productsList?.list && (
          <Pagination data={productsList} onPageChange={setCurrentPage} />
        )}
      </div>
    </>
  );
};

export default Product;
