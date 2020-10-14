const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const port = process.env.PORT || 5000;
const app = express();


//Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (request, response) => response.send('Running NodeJS + Express Api'));

/*
https://nodejsappapi.herokuapp.com/login
{
      "login": {
         "username":"ktm-duke",
         "password":"lufthansa"
      }
 }
**/
app.post('/login',function(request, response){
    try {
        const login = request.body.login;
        const username = ((login && login.username).trim().toLowerCase() || '');
        const password = ((login && login.password) || '');
        const result = ((username && username === 'kingsleytagbo') && (password && password === 'fullstack')) ? {result:true} : {result:false};
        console.log(result);
        response.send(result);
        response.end("ok");
    }
    catch (error) {
        console.log(error);
        response.send({})
        response.end("ok");
    }
  });

  
  app.listen(port, () => console.log(`Running NodeJS + Express Api on ${ port }`));

/*
app.get('/', (request, response) => {
    response.send('Hello World ...');
});
*/