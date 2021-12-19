import React from 'react';
import { Chart, registerables } from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';

Chart.register(...registerables);

const Index = () => {
  const data = {
    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Abr',
      'May',
      'Jun',
      // 'Jul',
      // 'Aug',
      // 'Sep',
      // 'Oct',
      // 'Nov',
      // 'Dec',
    ],
    datasets: [
      {
        label: 'Number of Orders',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className='grid max-w-full gap-8 py-4 lg:grid-cols-3 sm:grid-cols-2'>
      <div className='max-w-full bg-white shadow-card'>
        <Bar data={data} options={options} />
      </div>
      <div className='max-w-full bg-white shadow-card'>
        <Line data={data} options={options} />
      </div>
      <div className='max-w-full bg-white shadow-card'>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default Index;
