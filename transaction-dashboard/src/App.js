import React, { useState } from 'react';
import Dropdown from './components/Dropdown';
import TransactionStatistics from './components/TransactionsStatistics';
import TransactionTable from './components/TransactionsTable';
import TransactionBarChart from './components/TransactionsBarChart';

const App = () => {
  const [month, setMonth] = useState('March');

  return (
    <div>
      <h1>Transaction Dashboard</h1>
      <div>
        <label>Select Month: </label>
        <Dropdown month={month} setMonth={setMonth} />
      </div>
      <TransactionStatistics month={month} />
      <TransactionTable month={month} />
      <TransactionBarChart month={month} />
    </div>
  );
};

export default App;
