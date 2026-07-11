import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function HourlyChart({ hourlyData }) {
  if (!hourlyData?.length) return null;

  const labels = hourlyData.map((item) =>
    new Date(item.dt * 1000).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })
  );
  const temps = hourlyData.map((item) => Math.round(item.main.temp));

  return (
    <div className="chart-block">
      <h3 className="chart-block__title">Hourly forecast (today)</h3>
      <div className="chart-block__wrapper">
        <Line
          data={{
            labels,
            datasets: [{
              label: "Temperature °C",
              data: temps,
              borderColor: "#f5a623",
              backgroundColor: "rgba(245, 166, 35, 0.15)",
              fill: true,
              tension: 0.4,
              pointRadius: 4,
              pointBackgroundColor: "#f5a623",
            }],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
              y: { grid: { color: "rgba(0,0,0,0.06)" }, ticks: { callback: (v) => `${v}°` } },
              x: { grid: { display: false }, ticks: { maxRotation: 45, autoSkip: true, maxTicksLimit: 8 } },
            },
          }}
        />
      </div>
    </div>
  );
}
