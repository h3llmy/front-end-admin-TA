import React from "react";
import Navbar from "../navbar/navbar";
import Sidebar from "../sidebar/sidebar";

export default function DashboardLayout({ children }) {
  return (
    <React.Fragment>
      <Navbar />
      <Sidebar />
      <div className="p-4 ml-64">
        <div className="p-4 mt-14">{children}</div>
      </div>
    </React.Fragment>
  );
}
