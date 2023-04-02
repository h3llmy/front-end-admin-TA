import { useState, useEffect } from 'react';
import { fetchApi } from '../../utils/fetch.js';
import DashboardLayout from '../components/layout/dashboardLayout.jsx';
import Link from 'next/link.js';

export default function Dashboard() {
  const [productsList, setProductsList] = useState();

  useEffect(() => {
    const fetching = async () => {
      try {
        const [products] = await Promise.all([
          fetchApi.get('/product/list')
        ])
        setProductsList(products.data.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetching();
  }, []);

  return (
    <DashboardLayout>
      <Link href='/next'>
        <a className='btn-blue'>Go to home next</a>
      </Link>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos aliquid error, animi illum, dolore molestiae sapiente nihil sint iusto deserunt ipsum laborum earum repellat nostrum, aspernatur sit ex voluptatibus?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos aliquid error, animi illum, dolore molestiae sapiente nihil sint iusto deserunt ipsum laborum earum repellat nostrum, aspernatur sit ex voluptatibus?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos aliquid error, animi illum, dolore molestiae sapiente nihil sint iusto deserunt ipsum laborum earum repellat nostrum, aspernatur sit ex voluptatibus?</p>
    </DashboardLayout>
  );
}
