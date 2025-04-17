// frontend/src/components/RecipesChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const RecipesChart = ({ postsData }) => {
  const months = [
    'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
    'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
  ];

  // Transformer les données pour le graphique
  const chartData = {
    labels: months,
    datasets: [
      {
        label: 'Nombre de recettes',
        data: Array(12).fill(0).map((_, index) => {
          const monthData = postsData.find(item => item.month === index + 1);
          return monthData ? monthData.count : 0;
        }),
        backgroundColor: '#8b0000',
        borderColor: '#550000',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Recettes publiées par mois',
        font: {
          size: 16
        }
    },
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        precision: 0
      }
    }
  }
};

return (
  <div>
    <Bar data={chartData} options={options} />
  </div>
);
};

export default RecipesChart;