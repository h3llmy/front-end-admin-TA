import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import LoadingAnimation from "../loading/loadingAnimation";

export default function DoughnutChart({ title, labels, data }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
      },
      legend: {
        display: true,
        position: "bottom",
      },
    },
    aspectRatio: 2.5,
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "sold",
        data: data?.map((dataMap) => Number(dataMap) || 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      {data ? (
        <Doughnut options={options} data={chartData} />
      ) : (
        <div className="h-full flex justify-center">
          <LoadingAnimation />
        </div>
      )}
    </>
  );
}
