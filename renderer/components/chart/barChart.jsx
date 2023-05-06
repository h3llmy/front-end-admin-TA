import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  BarElement,
  BarController,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import LoadingAnimation from "../loading/loadingAnimation";

export default function BarChart({ labels, data, title }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    BarController,
    BarElement
  );

  const chartData = {
    labels,
    datasets: [
      {
        data: data,
        backgroundColor: "rgba(54, 162, 235, 0.5)",
        borderColor: "rgb(54, 162, 235)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: title,
      },
    },
    aspectRatio: 2.5,
  };

  return (
    <>
      {data ? (
        <Bar options={options} data={chartData} />
      ) : (
        <div className="h-full flex justify-center">
          <LoadingAnimation />
        </div>
      )}
    </>
  );
}
