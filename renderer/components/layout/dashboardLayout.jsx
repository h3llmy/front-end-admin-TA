import React, { useEffect } from "react";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { getLoginCookie } from "../../../utils/cookie";
import { useRouter } from "next/router";

export default function DashboardLayout({ children }) {
  const router = useRouter();
  const checkCooie = async () => {
    if (!(await getLoginCookie("user"))) {
      router.push("/login");
    }
  };
  useEffect(() => {
    checkCooie();
  });
  return (
    <React.Fragment>
      <Navbar />
      <Sidebar />
      <div className="p-4 ml-64">
        <div className="p-4 mt-14 max-h-screen">{children}</div>
      </div>
    </React.Fragment>
  );
}
