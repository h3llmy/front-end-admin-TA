import React, { useEffect } from "react";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";
import { getLoginCookie } from "../../../utils/cookie";
import { useRouter } from "next/router";

const DashboardLayout = ({ children }) => {
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
      <div className="ml-64">
        <div className="p-5 mt-14 max-h-screen">{children}</div>
      </div>
    </React.Fragment>
  );
};

export default DashboardLayout;
