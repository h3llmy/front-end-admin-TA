import React, { useEffect, useState } from 'react';
import Table from '../components/table/table';
import { fetchApi } from '../../utils/fetch';

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

  const columns = [
    'name',
    'category',
    'type'
  ]

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
      <form className="flex items-center pb-6" onSubmit={handleSubmit}>
        <label htmlFor="search" className="sr-only">Search</label>
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input type="text" id="search" name="search" onChange={handleOnchange} className="shadow-md bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search" />
        </div>
        <button type="submit" className="shadow-md p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
          <span className="sr-only">Search</span>
        </button>
      </form>

      <Table headers={columns} data={productsList?.list} actions={['detail', 'update', 'delete']} />

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
