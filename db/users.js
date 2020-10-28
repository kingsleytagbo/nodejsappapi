

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
        const login = (request && request.body && request.body.login) ? JSON.parse(request.body).login : {};
        const username = ((login && login.username) || '').trim().toLowerCase();
        const password = ((login && login.password) || '');
        const guest = { user_login: username, user_pass: password };
        POOLS.pool.query('SELECT * FROM wp_user WHERE user_login = $1 and user_pass = $2', [guest.user_login, guest.user_pass], (error, data) => {
            if (error) {
                throw error
            }

            const result = (data && data.rows && data.rows.length > 0) ?
                { authenticated: true, auth_token: (new Date()).toISOString() } :
                { authenticated: false, auth_token: null };
            if (result.authenticated === true) {
                response.status(200).send(result);
            }
            else {
                console.log({ loginUserFailure: guest, body: request.body });
                response.status(200).send(result);
            }
        });
        // next();
    }
    catch (error) {
        console.log({ loginUserApiFailure: error });
        response.status(500).send({});
        next();
    }
}


module.exports = { getUsers, loginUser };