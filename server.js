const express = require('express');
require('dotenv').config({path: 'config.env'});
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());


const PORT = 5000;

app.use('/api' , require('./routes/dataRoute'));
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

