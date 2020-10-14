const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const port = process.env.PORT || 5000;
const app = express();


//Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*');
    res.header("Access-Control-Allow-Credentials", true);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
    next();
});

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
app.post('/login',function(request, response, next){
    try {
        const login = request.body.login;
        const username = ((login && login.username).trim().toLowerCase() || '');
        const password = ((login && login.password) || '');
        const result = ((username && username === 'kingsleytagbo') && (password && password === 'fullstack')) ? {authenticated:true} : {authenticated:false};
        if(result.authenticated === true){
            response.status(200).send(result);
        }
        else{
            response.status(500).send(result);
        }
        console.log(result);
        next();
    }
    catch (error) {
        console.log(error);
        response.status(500).send(error);
        next();
    }
  });

  
  app.listen(port, () => console.log(`Running NodeJS + Express Api on ${ port }`));

/*
app.get('/', (request, response) => {
    response.send('Hello World ...');
});
*/