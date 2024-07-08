const Transaction = require('../models/Transaction');

// Helper function to get month index from name
// const getMonthIndex = (monthName) => {
//   return new Date(Date.parse(monthName + " 1, 2012")).getMonth();
// };

// const listTransactions = async (req, res) => {
//   try {
//     const { month, search, page = 1, perPage = 10 } = req.query;
//     const monthIndex = getMonthIndex(month);
//     const query = {
//       dateOfSale: { $month: monthIndex + 1 }
//     };

//     if (search) {
//       query.$or = [
//         { title: new RegExp(search, 'i') },
//         { description: new RegExp(search, 'i') },
//         { price: new RegExp(search, 'i') }
//       ];
//     }

//     const transactions = await Transaction.find(query)
//       .skip((page - 1) * perPage)
//       .limit(parseInt(perPage));

//     res.json(transactions);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const listTransactions = async (req, res) => {
    try {
      const { month, search, page = 1, perPage = 10 } = req.query;
      const monthIndex = getMonthIndex(month);
      
      const match = {
        month: monthIndex + 1,
      };
  
      if (search) {
        match.$or = [
          { title: new RegExp(search, 'i') },
          { description: new RegExp(search, 'i') },
          { price: new RegExp(search, 'i') }
        ];
      }
  
      const transactions = await Transaction.aggregate([
        {
          $addFields: {
            month: { $month: '$dateOfSale' }
          }
        },
        {
          $match: match
        },
        {
          $skip: (page - 1) * perPage
        },
        {
          $limit: parseInt(perPage)
        }
      ]);
  
      res.json(transactions);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
// const getStatistics = async (req, res) => {
//   try {
//     const { month } = req.query;
//     const monthIndex = getMonthIndex(month);

//     const transactions = await Transaction.find({ dateOfSale: { $month: monthIndex + 1 } });

//     const totalSaleAmount = transactions.reduce((sum, t) => sum + t.price, 0);
//     const soldItems = transactions.filter(t => t.sold).length;
//     const notSoldItems = transactions.filter(t => !t.sold).length;

//     res.json({ totalSaleAmount, soldItems, notSoldItems });
//   } catch (err) {
//     console.log(err)
//     res.status(500).json({ message: err.message });
//   }
// };

const getStatistics = async (req, res) => {
    try {
      const { month } = req.query;
      console.log(month)
      const monthIndex = getMonthIndex(month);
  
      const transactions = await Transaction.aggregate([
        {
          $addFields: {
            month: { $month: '$dateOfSale' }
          }
        },
        {
          $match: {
            month: monthIndex + 1
          }
        }
      ]);
  
      const totalSaleAmount = transactions.reduce((sum, t) => sum + t.price, 0);
      const soldItems = transactions.filter(t => t.sold).length;
      const notSoldItems = transactions.filter(t => !t.sold).length;
  
      res.json({ totalSaleAmount, soldItems, notSoldItems });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  };
  
  const getMonthIndex = (month) => {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    return months.indexOf(month);
  };
  
  module.exports = { getStatistics };
  

// const getBarChart = async (req, res) => {
//   try {
//     const { month } = req.query;
//     const monthIndex = getMonthIndex(month);

//     const transactions = await Transaction.find({ dateOfSale: { $month: monthIndex + 1 } });

//     const ranges = [
//       { range: '0-100', count: 0 },
//       { range: '101-200', count: 0 },
//       { range: '201-300', count: 0 },
//       { range: '301-400', count: 0 },
//       { range: '401-500', count: 0 },
//       { range: '501-600', count: 0 },
//       { range: '601-700', count: 0 },
//       { range: '701-800', count: 0 },
//       { range: '801-900', count: 0 },
//       { range: '901-above', count: 0 }
//     ];

//     transactions.forEach(t => {
//       if (t.price <= 100) ranges[0].count++;
//       else if (t.price <= 200) ranges[1].count++;
//       else if (t.price <= 300) ranges[2].count++;
//       else if (t.price <= 400) ranges[3].count++;
//       else if (t.price <= 500) ranges[4].count++;
//       else if (t.price <= 600) ranges[5].count++;
//       else if (t.price <= 700) ranges[6].count++;
//       else if (t.price <= 800) ranges[7].count++;
//       else if (t.price <= 900) ranges[8].count++;
//       else ranges[9].count++;
//     });

//     res.json(ranges);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };
const getBarChart = async (req, res) => {
    try {
      const { month } = req.query;
      const monthIndex = getMonthIndex(month);
  
      const transactions = await Transaction.aggregate([
        {
          $addFields: {
            month: { $month: '$dateOfSale' }
          }
        },
        {
          $match: {
            month: monthIndex + 1
          }
        }
      ]);
  
      const ranges = [
        { range: '0-100', count: 0 },
        { range: '101-200', count: 0 },
        { range: '201-300', count: 0 },
        { range: '301-400', count: 0 },
        { range: '401-500', count: 0 },
        { range: '501-600', count: 0 },
        { range: '601-700', count: 0 },
        { range: '701-800', count: 0 },
        { range: '801-900', count: 0 },
        { range: '901-above', count: 0 }
      ];
  
      transactions.forEach(t => {
        if (t.price <= 100) ranges[0].count++;
        else if (t.price <= 200) ranges[1].count++;
        else if (t.price <= 300) ranges[2].count++;
        else if (t.price <= 400) ranges[3].count++;
        else if (t.price <= 500) ranges[4].count++;
        else if (t.price <= 600) ranges[5].count++;
        else if (t.price <= 700) ranges[6].count++;
        else if (t.price <= 800) ranges[7].count++;
        else if (t.price <= 900) ranges[8].count++;
        else ranges[9].count++;
      });
  
      res.json(ranges);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// const getPieChart = async (req, res) => {
//   try {
//     const { month } = req.query;
//     const monthIndex = getMonthIndex(month);

//     const transactions = await Transaction.find({ dateOfSale: { $month: monthIndex + 1 } });

//     const categories = {};

//     transactions.forEach(t => {
//       if (!categories[t.category]) {
//         categories[t.category] = 0;
//       }
//       categories[t.category]++;
//     });

//     res.json(categories);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

const getCombinedData = async (req, res) => {
  try {
    const { month } = req.query;
    const monthIndex = getMonthIndex(month);

    const [transactions, statistics, barChart, pieChart] = await Promise.all([
      Transaction.find({ dateOfSale: { $month: monthIndex + 1 } }),
      Transaction.aggregate([
        { $match: { dateOfSale: { $month: monthIndex + 1 } } },
        {
          $group: {
            _id: null,
            totalSaleAmount: { $sum: '$price' },
            soldItems: { $sum: { $cond: ['$sold', 1, 0] } },
            notSoldItems: { $sum: { $cond: ['$sold', 0, 1] } }
          }
        }
      ]),
      Transaction.aggregate([
        { $match: { dateOfSale: { $month: monthIndex + 1 } } },
        {
          $bucket: {
            groupBy: '$price',
            boundaries: [0, 100, 200, 300, 400, 500, 600, 700, 800, 900, Infinity],
            default: '901-above',
            output: { count: { $sum: 1 } }
          }
        }
      ]),
      Transaction.aggregate([
        { $match: { dateOfSale: { $month: monthIndex + 1 } } },
        {
          $group: {
            _id: '$category',
            count: { $sum: 1 }
          }
        }
      ])
    ]);

    res.json({
      transactions,
      statistics: statistics[0],
      barChart,
      pieChart
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  listTransactions,
  getStatistics,
  getBarChart,
//   getPieChart,
  getCombinedData
};
