import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale,
} from "chart.js";
import "chartjs-adapter-date-fns";

import { HistoryPoint } from "~/api/historyPoints";
import Card from "../shared/Card";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  TimeScale,
  Title,
  Tooltip,
  Legend,
  Filler,
  CategoryScale
);

interface HistoryGraphProps {
  historyPoints: HistoryPoint[];
}

export const HistoryGraph: React.FC<HistoryGraphProps> = ({ historyPoints }) => {
  const data = {
    labels: historyPoints.map((point) => point.datetime),
    datasets: [
      // {
      //   label: "Машины",
      //   data: historyPoints.map((point) => point.cars),
      //   borderColor: "#3B82F6", // blue-500
      //   backgroundColor: "rgba(59, 130, 246, 0.1)",
      //   tension: 0.3,
      //   fill: true,
      // },
      {
        label: "Автобусы",
        data: historyPoints.map((point) => point.buses),
        borderColor: "#10B981", // green-500
        backgroundColor: "rgba(16, 185, 129, 0.1)",
        tension: 0.3,
        fill: true,
      },
      // {
      //   label: "Грузовики",
      //   data: historyPoints.map((point) => point.trucks ?? null),
      //   borderColor: "#F97316", // orange-500
      //   backgroundColor: "rgba(249, 115, 22, 0.1)",
      //   tension: 0.3,
      //   fill: true,
      // },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => {
            const label = ctx.dataset.label || "";
            const value = ctx.parsed.y;
            return `${label}: ${value ?? "—"}`;
          },
        },
      },
    },
    scales: {
      x: {
        type: "time" as const,
        time: {
          tooltipFormat: "dd.MM.yyyy HH:mm",
          displayFormats: {
            hour: "HH:mm",
            day: "dd.MM",
            month: "MMM yyyy",
          },
        },
        ticks: {
          maxRotation: 0,
          minRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <Card>
      <div className="px-4 sm:px-6 lg:px-8">
        <Line data={data} options={options} />
      </div>
    </Card>
  );
};

export default HistoryGraph;