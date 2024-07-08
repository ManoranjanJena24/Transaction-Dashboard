import React, { useState, useEffect } from 'react';
import api from '../api';
import './TransactionStatistics.css';

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
    <div className='statistics-container'>
      <h3>Statistics - {month}</h3>
      <table className="statistics-table">

    <tr>
      <td>Total Sale Amount:</td>
      <td>{statistics.totalSaleAmount}</td>
    </tr>
    <tr>
      <td>Total Sold Items:</td>
      <td>{statistics.soldItems}</td>
    </tr>
    <tr>
      <td>Total Not Sold Items:</td>
      <td>{statistics.notSoldItems}</td>
    </tr>
      </table>
      
    </div>
  );
};

export default TransactionStatistics;
