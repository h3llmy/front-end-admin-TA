import React, { useEffect, useState } from "react";
import Table from "../components/table/table";
import { fetchApi } from "../../utils/fetch";
import SearchForm from "../components/form/searchForm";
import Pagination from "../components/pagination/pagination";
import TestForm from "../components/form/testForm";

export default function Product() {
  const [productsList, setProductsList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetching = async () => {
      try {
        const [products] = await Promise.all([
          fetchApi.get(
            `/product/list?page=${currentPage}&limit=10${
              searchText && `&search=${searchText}`
            }`
          ),
        ]);
        setProductsList(products.data.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setProductsList({});
        } else {
          console.error(error);
        }
      }
    };
    fetching();
  }, [currentPage, searchText, productsList]);

  return (
    <>
      <SearchForm
        searchTextCallback={(search) => {
          setCurrentPage(1);
          setSearchText(search);
        }}
      />

      <Table
        headers={["name", "category", "type"]}
        data={productsList?.list}
        actions={{
          detail: (id, modalContent, setModal) => {
            modalContent(
              <TestForm
                id={id}
                setModal={(event) => {
                  setModal(event);
                }}
              />
            );
          },
          update: (id, modalContent) => {
            modalContent(<TestForm id={id} />);
          },
          delete: (id, modalContent) => {
            modalContent(<TestForm id={id} />);
          },
        }}
      />

      <div className="flex flex-row-reverse pt-6">
        {productsList?.list && (
          <Pagination
            data={productsList}
            onPageChange={(page) => {
              setCurrentPage(page);
            }}
          />
        )}
      </div>
    </>
  );
}
