const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')
require('dotenv').config();


const app = express();
app.use(cors())
const transactionsRoute = require('./routes/transactions');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json());
app.use('/api/transactions', transactionsRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
