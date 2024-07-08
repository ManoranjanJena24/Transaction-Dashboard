import React, { useState, useEffect } from 'react';
import api from '../api';

const TransactionStatistics = ({ month }) => {
  const [statistics, setStatistics] = useState({ totalSaleAmount: 0, soldItems: 0, notSoldItems: 0 });

  useEffect(() => {
    fetchStatistics();
  }, [month]);

  const fetchStatistics = async () => {
    const { data } = await api.get('/statistics', { params: { month } });
    setStatistics(data);
  };

  return (
    <div>
      <h3>Statistics for {month}</h3>
      <div>Total Sale Amount: {statistics.totalSaleAmount}</div>
      <div>Total Sold Items: {statistics.soldItems}</div>
      <div>Total Not Sold Items: {statistics.notSoldItems}</div>
    </div>
  );
};

export default TransactionStatistics;
