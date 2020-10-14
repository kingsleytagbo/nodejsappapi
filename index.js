const express = require('express');
const app = expresss();
const port = process.env.PORT || 5000;

app.get('/', (request, response) => {
    response.send('Hello World ...');
});