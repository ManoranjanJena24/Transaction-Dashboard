import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import TransactionStatistics from './components/TransactionsStatistics';
import TransactionTable from './components/TransactionsTable';
import TransactionBarChart from './components/TransactionsBarChart';

import './App.css';

const App = () => {
  const [month, setMonth] = useState('March');

  return (
    <div className='App'>

      <div className="dashboard-header">
        <h1>Transaction Dashboard</h1>
      </div>
      <TransactionTable month={month} />
      <div>
        <label>Select Month: </label>
        <Dropdown month={month} setMonth={setMonth} />
      </div>
      <TransactionStatistics month={month} />
      <TransactionBarChart month={month} />
    </div>
  );
};

export default App;
