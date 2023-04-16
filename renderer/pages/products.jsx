import React, { useEffect, useState } from "react";
import Table from "../components/table/table";
import { fetchApi } from "../../utils/fetch";
import UpdateModal from "../components/modal/updateModal";
import SearchForm from "../components/form/searchForm";
import Pagination from "../components/table/pagination";

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
  }, [currentPage, searchText]);

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
          detail: (id, modalContent) => {
            modalContent(<div>{id}</div>);
          },
          update: (id) => {
            modalContent(<div>{id}</div>);
          },
          delete: (id) => {
            modalContent(<div>{id}</div>);
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
