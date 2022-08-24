import Chart from 'chart.js/auto';
import { FC, useEffect, useRef } from 'react';
import { Loader } from '../Loader';

interface CardLineChartProps {
  title: string;
  labels: string[];
  weight: number[];
}

export const CardLineChart: FC<CardLineChartProps> = ({
  title,
  labels,
  weight,
}: CardLineChartProps) => {
  const canvasEl = useRef(null);

  const colors = {
    purple: {
      default: 'rgba(149, 76, 233, 1)',
      half: 'rgba(149, 76, 233, 0.5)',
      quarter: 'rgba(149, 76, 233, 0.25)',
      zero: 'rgba(149, 76, 233, 0)',
    },
    indigo: {
      default: 'rgba(80, 102, 120, 1)',
      quarter: 'rgba(80, 102, 120, 0.25)',
    },
  };

  useEffect(() => {
    // @ts-ignore
    const ctx = canvasEl.current.getContext('2d');

    const gradient = ctx.createLinearGradient(0, 16, 0, 600);
    gradient.addColorStop(0, colors.purple.half);
    gradient.addColorStop(0.65, colors.purple.quarter);
    gradient.addColorStop(1, colors.purple.zero);

    const data = {
      labels: labels,
      datasets: [
        {
          backgroundColor: gradient,
          label: 'Total',
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
      type: 'line',
      data: data,
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
        <canvas id="myChart" ref={canvasEl} height="100" />
      )}
    </div>
  );
};
