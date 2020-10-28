

const POOLS = require('../db/postgress/connection');

const getUsers = (request, response) => {
    POOLS.pool.query('SELECT * FROM wp_user ORDER BY ID ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0])
    })
  };

  const loginUser = (request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    try {
        const login = (request.body.login) ? request.body.login : JSON.parse(request.body).login;
        const username = ((login && login.username) || '').trim().toLowerCase();
        const password = ((login && login.password) || '');
        const guest = {user_login: username, user_pass: password};
        POOLS.pool.query('SELECT * FROM wp_user WHERE user_login = $1 and user_passw = $2', [user_login, user_pass], (error, results) => {
            if (error) {
              throw error
            }
            console.log({loginUser: result.rows});
            response.status(200).json(results.rows)
          })
          /*
        const result = ((username && username === 'kingsleytagbo') && (password && password === 'fullstack')) ? 
        {authenticated:true, auth_token: (new Date()).toISOString()} : 
        {authenticated:false, auth_token: null};
        if(result.authenticated === true){
            response.status(200).send(result);
        }
        else{
            response.status(200).send(result);
        }
        console.log({login:login, body: request.body, result: result, username: username, password:password});
        */
        next();
    }
    catch (error) {
        console.log(error);
        response.status(500).send({});
        next();
    }
  }
  

module.exports = { getUsers, loginUser };