// frontend/src/components/UserActivityChart.jsx
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const UserActivityChart = ({ userData }) => {
  const chartData = {
    labels: userData.map(user => user.username_u),
    datasets: [
      {
        label: 'Recettes publiées',
        data: userData.map(user => user.post_count),
        backgroundColor: '#8b0000',
        stack: 'Stack 0',
      },
      {
        label: 'Commentaires',
        data: userData.map(user => user.comment_count),
        backgroundColor: '#550000',
        stack: 'Stack 0',
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
        text: 'Activité des utilisateurs',
        font: {
          size: 16
        }
      },
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
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

export default UserActivityChart;