import React, { useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Désactiver les animations au niveau global pour Chart.js
ChartJS.defaults.animation = false;
ChartJS.defaults.animations = false;
ChartJS.defaults.transitions = {
  active: {
    animation: {
      duration: 0
    }
  }
};

const RecipesChart = ({ postsData }) => {
  // Log uniquement en développement et correctement dans une fonction
  useEffect(() => {
    console.log("Render RecipesChart", postsData);
  }, [postsData]);

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
    maintainAspectRatio: true,
    animation: false,
    animations: false,
    animation: {
      duration: 0
    },
    animations: {
      colors: false,
      x: false,
      y: false
    },
    transitions: {
      active: {
        animation: {
          duration: 0
        }
      }
    },
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
      }
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
      {/* Utilisation d'une key unique basée sur les données pour forcer le re-rendu complet */}
      <Bar 
        key={`recipes-chart-${JSON.stringify(postsData)}`} 
        data={chartData} 
        options={options} 
        redraw={true}
      />
    </div>
  );
};

export default React.memo(RecipesChart);