import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import api from '../api';

const TransactionBarChart = ({ month }) => {
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    fetchBarData();
  }, [month]);

  const fetchBarData = async () => {
    const { data } = await api.get('/bar-chart', { params: { month } });
    setBarData(data);
  };

  const data = {
    labels: barData.map(item => item.range),
    datasets: [
      {
        label: '# of Items',
        data: barData.map(item => item.count),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }
    ]
  };

  return (
    <div>
      <h3>Bar Chart for {month}</h3>
      <Bar data={data} />
    </div>
  );
};

export default TransactionBarChart;
