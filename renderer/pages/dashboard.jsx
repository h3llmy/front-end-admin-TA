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
    <>
      <Link href='/next'>
        <a className='btn-blue'>Go to home next</a>
      </Link>
      <Line options={options} data={data} />
    </>
  );
}

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 1001)),
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Dataset 2',
      data: labels.map(() => Math.floor(Math.random() * 1001)),
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    },
  ],
};