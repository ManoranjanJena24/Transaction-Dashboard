import React, { useState, useEffect } from 'react';
import api from '../api';
import Chart from 'chart.js/auto';
import './TransactionTable.css';

const TransactionTable = ({ month }) => {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  

  useEffect(() => {
    fetchTransactions();
  }, [month, search, page]);

  const fetchTransactions = async () => {
    try {
      const { data } = await api.get('/', { params: { month, search, page, perPage } });
      setTransactions(data);

      renderBarChart(data); // Assuming you have a function to render charts
    } catch (error) {
      console.error('Error fetching transactions:', error);
    }
  };

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setPage(1);
  };

  const renderBarChart = (data) => {
    const ctx = document.getElementById('barChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: data.map(transaction => transaction.category),
          datasets: [{
            label: 'Number of Transactions',
            data: data.map(transaction => transaction.price),
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  return (
    <div className="container">
      <div className="table-container">
        <input
          type="text"
          className="input-search"
          placeholder="Search transactions"
          value={search}
          onChange={handleSearchChange}
        />
        <table className="transaction-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Price</th>
              <th>Date of Sale</th>
              <th>Category</th>
              <th>Sold</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id}>
                <td>{transaction.title}</td>
                <td>{transaction.description}</td>
                <td>{transaction.price}</td>
                <td>{new Date(transaction.dateOfSale).toLocaleDateString()}</td>
                <td>{transaction.category}</td>
                <td>{transaction.sold ? 'Yes' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <button onClick={() => setPage(page > 1 ? page - 1 : 1)}>Previous</button>
          <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
        {/* <div>
          <canvas id="barChart" width="400" height="400"></canvas>
        </div> */}
      </div>
    </div>
  );
};

export default TransactionTable;
