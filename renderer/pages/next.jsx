import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function Next() {
  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron</title>
      </Head>
      <div className='grid grid-col-1 text-2xl w-full text-center'>
        <img className='ml-auto mr-auto' src='/images/logo.png' />
        <span>⚡ Nextron ⚡</span>
      </div>
      <div className='mt-1 w-full flex-wrap flex justify-center'>
        <Link href='/home'>
          <a className='btn-blue'>Go to home page</a>
        </Link>
      </div>
    </React.Fragment>
  )
}
