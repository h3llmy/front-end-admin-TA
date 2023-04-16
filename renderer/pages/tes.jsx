import React, { useEffect, useState } from "react";
import Table from "../components/table/table";
import { fetchApi } from "../../utils/fetch";
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

  const totalPages = productsList?.totalPages;

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchText(event.target.elements.search.value);
    setCurrentPage(1);
  };

  const handleOnchange = (event) => {
    event.preventDefault();
    if (event.target.value == "") {
      setSearchText(event);
    }
  };

  return (
    <>
      <SearchForm
        handleSubmitCallback={handleSubmit}
        handleOnchangeCallback={handleOnchange}
      />

      <Table
        headers={["name", "category", "type"]}
        data={productsList?.list}
        actions={["detail", "update", "delete"]}
      />

      <div className="flex flex-row-reverse pt-6">
        {productsList?.list && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePreviousClick={handlePreviousClick}
            handleNextClick={handleNextClick}
            handlePageClick={handlePageClick}
          />
        )}
      </div>
    </>
  );
}
