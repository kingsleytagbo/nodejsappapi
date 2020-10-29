

const POOLS = require('../db/postgress/connection');

const getUsers = (request, response) => {
    response.setHeader('Content-Type', 'application/json');
    POOLS.pool.query('SELECT * FROM wp_user ORDER BY ID ASC', (error, results) => {
        if (error) {
            throw error
        }
        response.status(200).send(results.rows)
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
            user.user_status = result.authenticated ? 0 : 1;
            const
                user_login = user.user_login,
                user_pass = user.user_pass,
                user_nicename = user.user_nicename,
                user_email = user.user_email,
                display_name = user.display_name,
                user_status = user.user_status,
                user_registered = user.user_registered,
                user_url = user.user_url,
                user_activation_key = user.user_activation_key,
                spam = user.spam,
                deleted = user.deleted, site_id = user.site_id;

            POOLS.pool.query('INSERT INTO wp_user (user_login, user_pass, user_nicename,user_email,display_name,user_status,user_registered,user_url,user_activation_key,spam, deleted,site_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING id',
                [user_login, user_pass, user_nicename, user_email, display_name,
                    user_status, user_registered, user_url, user_activation_key, spam,
                    deleted, site_id], (error, newUser) => {
                        if (error) {
                            throw error
                        }
                        console.log({ createUserSuccess: newUser.rows[0] });
                        if (newUser && newUser.rows && newUser.rows[0].id) {
                            response.status(200).send({id: newUser.rows[0].id});
                        }
                        else {
                            response.status(500).send({});
                        }
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

const updateUser = (request, response, next) => {
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
            user.user_status = result.authenticated ? 0 : 1;
            const
                user_login = user.user_login,
                user_pass = user.user_pass,
                user_nicename = user.user_nicename,
                user_email = user.user_email,
                display_name = user.display_name,
                user_status = user.user_status,
                user_registered = user.user_registered,
                user_url = user.user_url,
                user_activation_key = user.user_activation_key,
                spam = user.spam,
                deleted = user.deleted, 
                site_id = user.site_id,
                id = user.id;

            POOLS.pool.query('UPDATE wp_user SET user_login=$1, user_pass=$2, user_nicename=$3, user_email=$4, display_name=$5, user_status=$6, user_registered=$7, user_url=$8, user_activation_key=$9,spam=$10, deleted=$11, site_id=$12 WHERE id=$13 RETURNING id',
                [user_login, user_pass, user_nicename, user_email, display_name,
                    user_status, user_registered, user_url, user_activation_key, spam,
                    deleted, site_id,  id], (error, newUser) => {
                        if (error) {
                            throw error
                        }
                        console.log({ updateUserSuccess: newUser.rows });
                        if (newUser && newUser.rows) {
                            response.status(200).send({id: id, user_pass:user_pass, user_email:user_email, user_nicename: user_nicename, user_login:user_login});
                        }
                        else {
                            response.status(500).send({});
                        }
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


module.exports = { getUsers, loginUser, createUser, updateUser };