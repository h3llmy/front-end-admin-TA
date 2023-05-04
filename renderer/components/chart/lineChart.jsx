import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from "chart.js";
import { Line } from "react-chartjs-2";
import LoadingAnimation from "../loading/loadingAnimation";

export default function LineChart({ labels, data, title }) {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip
  );

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

  const chartData = {
    labels,
    datasets: [
      {
        data: data,
        borderColor: "rgba(54, 162, 235, 0.5)",
        backgroundColor: "rgba(54, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <>
      {data ? (
        <Line options={options} data={chartData} />
      ) : (
        <div className="h-full flex justify-center">
          <LoadingAnimation />
        </div>
      )}
    </>
  );
}
