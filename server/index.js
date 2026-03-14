const express = require('express');
const cors = require('cors');
require('dotenv').config();
const meeraRoute = require('./routes/meera');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', meeraRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`HEIST server running on port ${PORT}`));
