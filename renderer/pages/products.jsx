import React, { useEffect, useState } from 'react';
import Table from '../components/table/table';
import { fetchApi } from '../../utils/fetch';
import SearchForm from '../components/form/searchForm';
import UpdateModal from '../components/modal/updateModal';

export default function Product() {
  const [productsList, setProductsList] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [searchText, setSearchText] = useState('');

  useEffect(() => {
    const fetching = async () => {
      try {
        const [products] = await Promise.all([
          fetchApi.get(`/product/list?page=${currentPage}&limit=10${searchText && `&search=${searchText}`}`)
        ])
        setProductsList(products.data.data);
      } catch (error) {
        if (error.response && error.response.status === 404) {
          setProductsList({});
        } else {
          console.error(error);
        }
      }
    }
    fetching();
  }, [currentPage, searchText]);

  const totalPages = productsList?.totalPages;
  const displayPages = 5;
  let pageStart = currentPage - Math.floor(displayPages / 2);
  pageStart = Math.max(pageStart, 1);
  let pageEnd = pageStart + displayPages - 1;
  pageEnd = Math.min(pageEnd, totalPages);

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handlePageClick = (page) => {
    setCurrentPage(page);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSearchText(event.target.elements.search.value);
  }

  const handleOnchange = (event) => {
    event.preventDefault();
    if (event.target.value == '') {
      setSearchText(event);
    }
  }

  const pageButtons = [];
  for (let i = pageStart; i <= pageEnd; i++) {
    pageButtons.push(
      <li key={i}>
        <button onClick={() => handlePageClick(i)} className={`px-3 py-2 leading-tight border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white ${currentPage === i ? 'cursor-not-allowed text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-800 dark:hover:bg-blue-700' : 'dark:bg-gray-800'}`}>
          {i}
        </button>
      </li>
    )
  }


  return (
    <>
      <SearchForm handleSubmitCallback={handleSubmit} handleOnchangeCallback={handleOnchange} />

      <Table headers={['name', 'category', 'type']} data={productsList?.list} actions={['detail', 'update', 'delete']} />

      <div className='flex flex-row-reverse pt-6'>
        {productsList?.list && (
          <nav aria-label="Page navigation example">
            <ul className="inline-flex -space-x-px shadow-md">
              <li>
                <button onClick={handlePreviousClick} disabled={currentPage === 1} className={`${currentPage === 1 ? 'cursor-not-allowed' : null} px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                  Previous
                </button>
              </li>
              {pageButtons}
              <li>
                <button onClick={handleNextClick} disabled={currentPage === totalPages} className={`${currentPage === totalPages ? 'cursor-not-allowed' : null} px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}>
                  Next
                </button>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </>
  )
}
