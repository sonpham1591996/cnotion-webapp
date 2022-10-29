import Chart from "chart.js/auto";
import { FC, useEffect, useRef } from "react";
import { Loader } from "../Loader";

interface CardLineChartProps {
  title: string;
  labels: string[];
  weight: number[];
  filteredTime: string;
  onFilterTime: Function;
}

export const CardLineChart: FC<CardLineChartProps> = ({
  title,
  labels,
  weight,
  filteredTime,
  onFilterTime,
}: CardLineChartProps) => {
  const canvasEl = useRef(null);

  const colors = {
    purple: {
      default: "rgba(149, 76, 233, 1)",
      half: "rgba(149, 76, 233, 0.5)",
      quarter: "rgba(149, 76, 233, 0.25)",
      zero: "rgba(149, 76, 233, 0)",
    },
    indigo: {
      default: "rgba(80, 102, 120, 1)",
      quarter: "rgba(80, 102, 120, 0.25)",
    },
  };

  useEffect(() => {
    // @ts-ignore
    const ctx = canvasEl?.current?.getContext("2d");
    if (!ctx) return;

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: "Total",
          data: weight,
          fill: true,
          borderWidth: 2,
          borderColor: colors.purple.default,
          lineTension: 0.2,
          pointBackgroundColor: colors.purple.default,
          pointRadius: 3,
        },
      ],
    };
    const config: any = {
      type: "line",
      data: data,
      // responsive: false,
    };
    const myLineChart = new Chart(ctx, config);

    return function cleanup() {
      myLineChart.destroy();
    };
  });

  return (
    <div className="App">
      <span className="text-xl font-bold">{title}</span>
      {labels.length === 0 || weight.length === 0 ? (
        <Loader />
      ) : (
        <>
          <ul className="flex flex-wrap text-sm font-medium text-center dark:text-white ml-2 mt-2 justify-end mr-8">
            {["7d"].map((op, index) => {
              return (
                <li
                  key={index}
                  className={`mr-2 border rounded rounded-lg cursor-pointer ${
                    op === filteredTime ? "bg-purple-600 text-white" : ""
                  }`}
                >
                  <div
                    className="inline-block py-1 px-4 rounded-lg active"
                    aria-current="page"
                    onClick={() => onFilterTime(op)}
                  >
                    {op}
                  </div>
                </li>
              );
            })}
          </ul>
          <canvas id="myChart" ref={canvasEl} />
        </>
      )}
    </div>
  );
};
