import React from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Sidebar from '../components/sidebar';

export default function Next() {
  return (
    <React.Fragment>
      <Navbar />
      <Sidebar />
      <div className="p-4 ml-64">
        <div className="p-4 mt-14">
          <Link href='/dashboard'>
            <a className='btn-blue'>Go to home page</a>
          </Link>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos aliquid error, animi illum, dolore molestiae sapiente nihil sint iusto deserunt ipsum laborum earum repellat nostrum, aspernatur sit ex voluptatibus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos aliquid error, animi illum, dolore molestiae sapiente nihil sint iusto deserunt ipsum laborum earum repellat nostrum, aspernatur sit ex voluptatibus?</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos aliquid error, animi illum, dolore molestiae sapiente nihil sint iusto deserunt ipsum laborum earum repellat nostrum, aspernatur sit ex voluptatibus?</p>
        </div>
      </div>
    </React.Fragment>
  )
}
