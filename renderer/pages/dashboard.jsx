import { useState, useEffect } from "react";
import { fetchApi } from "../../utils/fetch.js";
import LineChart from "../components/chart/lineChart.jsx";
import BarChart from "../components/chart/barChart.jsx";
import { getLoginCookie } from "../../utils/cookie.js";

export default function Dashboard() {
  const [incomePerMonth, setIncomePerMonth] = useState();
  const [incomePerYear, setIncomePerYear] = useState();

  const fetching = async () => {
    try {
      const [perMonth, perYear] = await Promise.all([
        fetchApi.get("/order/list/permonth", {
          headers: {
            Authorization: `Bearer ${await getLoginCookie("user")}`,
          },
        }),
        fetchApi.get("/order/list/peryear", {
          headers: {
            Authorization: `Bearer ${await getLoginCookie("user")}`,
          },
        }),
      ]);
      setIncomePerMonth(perMonth.data.data);
      setIncomePerYear(perYear.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full h-64 dark:bg-gray-800 rounded-lg p-3 shadow-md">
          <BarChart
            title={`Data Penjualan Bulanan ${new Date().getFullYear()}`}
            labels={incomePerMonth?.map((product) => product.month)}
            data={incomePerMonth?.map((product) => product.totalIncome)}
          ></BarChart>
        </div>
        <div className="w-full h-64 dark:bg-gray-800 rounded-lg p-3 shadow-md">
          <LineChart
            title={`Data Penjualan ${
              new Date().getFullYear() - 10
            } - ${new Date().getFullYear()}`}
            labels={incomePerYear?.map((product) => product.year)}
            data={incomePerYear?.map((product) => product.totalIncome)}
          ></LineChart>
        </div>
      </div>
    </>
  );
}
