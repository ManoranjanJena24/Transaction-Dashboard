import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../api';
import './TransactionBarChart.css';

const TransactionBarChart = ({ month }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    fetchBarData();
  }, [month]);

  const fetchBarData = async () => {
    try {
      const { data } = await api.get('/bar-chart', { params: { month } });
      setBarData(data);
    } catch (error) {
      console.error('Error fetching bar chart data:', error);
    }
  };

  const data = {
    labels: barData.map(item => item.range),
    datasets: [
      {
        label: 'Number of Items',
        data: barData.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 20, 
          precision: 0 
        }
      }
    }
  };

  return (
    <div className='bar-chart-container'>
      <h2>Bar Chart Stats - {month}</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default TransactionBarChart;
