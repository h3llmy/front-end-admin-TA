import { useState, useEffect } from "react";
import { fetchApi } from "../../utils/fetch.js";
import LineChart from "../components/chart/lineChart.jsx";
import BarChart from "../components/chart/barChart.jsx";
import { getLoginCookie } from "../../utils/cookie.js";
import DoughnutChart from "../components/chart/doughnutChart.jsx";
import Counter from "../components/card/counter.jsx";

const Dashboard = () => {
  const [incomePerMonth, setIncomePerMonth] = useState();
  const [incomePerYear, setIncomePerYear] = useState();
  const [categorys, setCategory] = useState({});
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);
  const [totalUser, setTotalUser] = useState(0);

  const fetching = async () => {
    try {
      const cookie = await getLoginCookie("user");
      const [perMonth, perYear, category, order, products, categories, users] =
        await Promise.all([
          fetchApi.get("/order/list/permonth", {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }),
          fetchApi.get("/order/list/peryear", {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }),
          fetchApi.get("/categories/list", {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }),
          fetchApi.get("/order/total", {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }),
          fetchApi.get("/product/total", {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }),
          fetchApi.get("/categories/total", {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }),
          fetchApi.get("/user/total", {
            headers: {
              Authorization: `Bearer ${cookie}`,
            },
          }),
        ]);
      setIncomePerMonth(perMonth.data.data);
      setIncomePerYear(perYear.data.data);
      setCategory(category.data.data);
      setTotalOrders(order.data.data);
      setTotalProducts(products.data.data);
      setTotalCategories(categories.data.data);
      setTotalUser(users.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetching();
  }, []);

  return (
    <>
      <div className="grid grid-cols-4 gap-4 pb-4">
        <Counter label={"Total Order"} data={totalOrders} />
        <Counter label={"Total Product"} data={totalProducts} />
        <Counter label={"Total Category"} data={totalCategories} />
        <Counter label={"Total User"} data={totalUser} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 shadow-md">
          <BarChart
            title={`monthly sales ${new Date().getFullYear()}`}
            labels={incomePerMonth?.map((product) => product.month)}
            data={incomePerMonth?.map((product) => product.totalIncome)}
          />
        </div>
        <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 shadow-md">
          <LineChart
            title={`sales data for ${
              new Date().getFullYear() - 10
            } - ${new Date().getFullYear()}`}
            labels={incomePerYear?.map((product) => product.year)}
            data={incomePerYear?.map((product) => product.totalIncome)}
          />
        </div>
      </div>
      <div className="w-full mt-4 h-80 bg-gray-100 dark:bg-gray-800 rounded-lg p-3 shadow-md">
        <DoughnutChart
          title={"sales per category"}
          labels={categorys?.list?.map((category) => category.name)}
          data={categorys?.list?.map((category) => category.sold)}
        />
      </div>
    </>
  );
};

export default Dashboard;
