import React, { useEffect } from "react";
import Head from "next/head";

import "../styles/globals.css";
import DashboardLayout from "../components/layout/dashboardLayout";

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const HeadComponent = (
    <Head>
      <title>Admin Semua Aplikasi Indonesia</title>
    </Head>
  );

  const ComponentWithPageProps = <Component {...pageProps} />;

  const LayoutComponent = Component.getLayout ? (
    Component.getLayout(ComponentWithPageProps)
  ) : (
    <DashboardLayout>{ComponentWithPageProps}</DashboardLayout>
  );

  return (
    <>
      {HeadComponent}
      {LayoutComponent}
    </>
  );
}
