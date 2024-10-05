const dotenv = require('dotenv');
require('dotenv').config({ path: 'config.env' });

const data = async (req, res) => {
    const { URL } = req.query;
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': process.env.API_KEY,
            'x-rapidapi-host': process.env.HOST_KEY,
        },
    };
    try {
        const response = await fetch(`${process.env.KEY_URL}url=${URL}&quality=320`, options); // Updated fetch call
        const result = await response.json();
        console.log(result);
        res.status(200).json({ result });
    } catch (error) {
        console.error(error);
    }
}

module.exports = { data };