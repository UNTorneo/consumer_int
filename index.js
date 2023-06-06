const express = require('express');
const dotenv = require('dotenv');
const Remote = require('./core/util/remote');

dotenv.config();

const app = express();
const port = process.env.PORT;

app.get('/', async (req, res) =>  {
    const response = await Remote.getPost();
    res.send(response);
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});