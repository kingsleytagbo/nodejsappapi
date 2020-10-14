const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const path = require('path');

app
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (req, res) => res.send('Hello World ...'))
  .listen(port, () => console.log(`Listening on ${ port }`)
);

/*
app.get('/', (request, response) => {
    response.send('Hello World ...');
});
*/