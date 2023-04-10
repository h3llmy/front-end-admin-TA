import React from 'react';
import Link from 'next/link';
import DashboardLayout from '../components/layout/dashboardLayout';

export default function Next() {
  return (
    <>
      <Link href='/dashboard'>
        <a className='btn-blue'>Go to home page</a>
      </Link>
      <br></br>
      <Link href='/login'>
        <a className='btn-blue'>Go to home page</a>
      </Link>
      <h1>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo adipisci dolorum ea. Enim asperiores ipsa inventore voluptatem, impedit minus soluta error necessitatibus nobis magnam, nihil saepe ut aspernatur dolorem eaque.</h1>
    </>
  )
}
