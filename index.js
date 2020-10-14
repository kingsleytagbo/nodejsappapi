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
  .get('/', (request, response) => response.send('Running NodeJS Api + Express Server'))
  .listen(port, () => console.log(`Listening on ${ port }`)
);

/*
https://nodejsappapi.herokuapp.com/login
{
  "login:{username\"kayt\", password: \"badbody\"}": {}
}
**/
app.post('/login',function(request, response){
    let user_name=request.body.user;
    let password=request.body.password;
    let login = request.body;
    console.log({login: login});
    response.send(login)
    response.end("ok");
  });

/*
app.get('/', (request, response) => {
    response.send('Hello World ...');
});
*/