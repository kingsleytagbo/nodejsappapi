const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');

const port = process.env.PORT || 5000;
const app = express();


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app
  .use(express.static(path.join(__dirname, 'public')))
  .get('/', (request, response) => response.send('Running NodeJS + Express Api'));

/*
https://nodejsappapi.herokuapp.com/login
{
  "login:{username\"kayt\", password: \"badbody\"}": {}
}
**/
app.post('/login',function(request, response){
    const login = JSON.parse(request.body);
    const username= ((login && login.username) || '');
    const password= ((login && login.password) || '');
    const result = {username: username, password: password};
    console.log(login);
    response.send(login)
    response.end("ok");
  });

  
  app.listen(port, () => console.log(`Running NodeJS + Express Api on ${ port }`));

/*
app.get('/', (request, response) => {
    response.send('Hello World ...');
});
*/