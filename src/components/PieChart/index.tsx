import Chart from "chart.js/auto";
import { FC, useEffect, useRef } from "react";
import { Loader } from "../Loader";

interface PieChartProps {
  title: string;
  labels: string[];
  weight: number[];
}

var dynamicColors = function () {
  var r = Math.floor(Math.random() * 255);
  var g = Math.floor(Math.random() * 255);
  var b = Math.floor(Math.random() * 255);
  return "rgb(" + r + "," + g + "," + b + ")";
};

export const PieChart: FC<PieChartProps> = ({
  title,
  labels,
  weight,
}: PieChartProps) => {
  const canvasEl = useRef(null);

  useEffect(() => {
    // @ts-ignore
    const ctx = canvasEl?.current?.getContext("2d");
    if (!ctx) return;

    const data = {
      datasets: [
        {
          label: "Portfolio",
          data: weight,
          backgroundColor: labels.map((_) => dynamicColors()),
          hoverOffset: 4,
        },
      ],
      labels: labels,
    };
    const config: any = {
      type: "doughnut",
      data: data,
    };
    const pieChart = new Chart(ctx, config);

    return function cleanup() {
      pieChart.destroy();
    };
  });

  return (
    <div className="App">
      <p className="text-xl font-bold">{title}</p>
      {labels.length === 0 || weight.length === 0 ? (
        <Loader />
      ) : (
        <canvas id="myChart" ref={canvasEl} height="100" />
      )}
    </div>
  );
};
