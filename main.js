// Imports
const express = require('express');
const envelopeRouter = require('./scripts/routers.js');

// App setup
const app = express();
const PORT = process.env.PORT || 3000;

// Attach envelope router
app.use('/envelopes', envelopeRouter);

// Middleware
app.get('/', (req, res) => {
    res.send('<h1>Main page of Envelope Budget API</h1>');
})

// 404 route
app.get('*', (req, res, next) => {
    res.status(404).send('No page found');
})

// Listen to requests
app.listen(PORT, () => {
    console.log(`Express app connected at port ${PORT}`);
})