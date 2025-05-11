// frontend/src/components/RatingsChart.jsx
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const RatingsChart = ({ ratingsData }) => {
  // Préparer les données
  const chartData = {
    labels: ratingsData.map(item => `${item.rating} étoile${item.rating > 1 ? 's' : ''}`),
    datasets: [
      {
        label: 'Nombre d\'évaluations',
        data: ratingsData.map(item => item.count),
        backgroundColor: [
          '#ff6b6b',
          '#ffa96b',
          '#ffd16b',
          '#c2e59c',
          '#4CB8C4',
        ],
        borderColor: [
          '#ff5252',
          '#ff9852',
          '#ffcc52',
          '#a8d882',
          '#32a8b4',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Distribution des évaluations',
        font: {
          size: 16
        }
      },
    },
  };

  return (
    <div>
      <Pie data={chartData} options={options} />
    </div>
  );
};

export default RatingsChart;