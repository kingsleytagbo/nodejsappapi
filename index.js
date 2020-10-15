const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const port = process.env.PORT || 5000;
const app = express();


//Here we are configuring express to use body-parser as middle-ware.
// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.text());
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
    response.setHeader('Content-Type', 'application/json');
    try {
        const login = (request.body.login) ? request.body.login : JSON.parse(request.body).login;
        const username = ((login && login.username) || '').trim().toLowerCase();
        const password = ((login && login.password) || '');
        const result = ((username && username === 'kingsleytagbo') && (password && password === 'fullstack')) ? 
        {authenticated:true, auth_token: (new Date()).toIsoString()} : 
        {authenticated:false, auth_token: null};
        if(result.authenticated === true){
            response.status(200).send(result);
        }
        else{
            response.status(200).send(result);
        }
        console.log({login:login, body: request.body, result: result, username: username, password:password});
        next();
    }
    catch (error) {
        console.log(error);
        response.status(500).send({});
        next();
    }
  });

  
  app.listen(port, () => console.log(`Running NodeJS + Express Api on ${ port }`));

/*
app.get('/', (request, response) => {
    response.send('Hello World ...');
});
*/