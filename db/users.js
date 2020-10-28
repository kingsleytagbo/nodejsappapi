

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
        const login = (request && request.body) ? JSON.parse(request.body).login : {};
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

const createUser = (request, response, next) => {
    response.setHeader('Content-Type', 'application/json');
    try {
        const login = (request && request.body) ? JSON.parse(request.body).login : {};
        const user = (request && request.body) ? JSON.parse(request.body).user : {};
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
            user.spam = result.authenticated ? 0 : 1;
            const 
                user_login = user.user_login, 
                user_pass= user.user_pass, 
                user_nicename=user.user_nicename, 
                user_email = user.user_email, 
                display_name = user.display_name,
                user_status = user.user_status, 
                user_registered = user.user_registered, 
                user_url = user.user_url, 
                user_activation_key = user.user_activation_key, 
                spam = user.spam,
                deleted = user.deleted, site_id = user.site_id;

            POOLS.pool.query('INSERT INTO wp_user (user_login, user_pass, user_nicename,user_email,display_name,user_status,user_registered,user_url,user_activation_key,spam, deleted,site_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)',
                [user_login, user_pass, user_nicename, user_email, display_name,
                    user_status, user_registered, user_url, user_activation_key, spam,
                    deleted, site_id], (error, results) => {
                        if (error) {
                            throw error
                        }
                        console.log({createUserSuccess: result.insertId});
                        response.status(201).send(`createUserSuccess: ${result.insertId}`)
                    });

        });
        // next();
    }
    catch (error) {
        console.log({ saveUserApiFailure: error });
        response.status(500).send({});
        next();
    }
}


module.exports = { getUsers, loginUser, createUser };