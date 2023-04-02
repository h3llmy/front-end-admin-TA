import React, { useEffect } from 'react';
import Head from 'next/head';

import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme")
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [])
  return (
    <>
      <Head>
        <title>Admin Semua Aplikasi Indonesia</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
