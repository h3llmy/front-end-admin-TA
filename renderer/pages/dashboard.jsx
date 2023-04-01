import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import Sidebar from '../components/sidebar';
import Navbar from '../components/navbar';

export default function Dashboard() {
  const [productsList, setProductsList] = useState();

  useEffect(() => {
    async function getProducts() {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/product/list');
        setProductsList(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    getProducts();
  }, []);

  return (
    <React.Fragment>
      <Navbar />
      <Sidebar />
      <div className="p-4 ml-64">
        <div className="p-4 mt-14">
          <Link href='/next'>
            <a className='btn-blue'>Go to next page</a>
          </Link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos aliquid error, animi illum, dolore molestiae sapiente nihil sint iusto deserunt ipsum laborum earum repellat nostrum, aspernatur sit ex voluptatibus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos aliquid error, animi illum, dolore molestiae sapiente nihil sint iusto deserunt ipsum laborum earum repellat nostrum, aspernatur sit ex voluptatibus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos aliquid error, animi illum, dolore molestiae sapiente nihil sint iusto deserunt ipsum laborum earum repellat nostrum, aspernatur sit ex voluptatibus?</p>
        </div>
      </div>
    </React.Fragment>
  );
}
