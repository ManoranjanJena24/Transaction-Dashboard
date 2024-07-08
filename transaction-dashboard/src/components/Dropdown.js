import React from 'react';

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];

const Dropdown = ({ month, setMonth }) => {
  return (
    <select value={month} onChange={(e) => setMonth(e.target.value)}>
      {months.map((m) => (
        <option key={m} value={m}>{m}</option>
      ))}
    </select>
  );
};

export default Dropdown;
