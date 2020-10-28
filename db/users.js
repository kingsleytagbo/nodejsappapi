

const POOLS = require('../db/postgress/connection');
const getUsers = (errors, result) => {
    POOLS.pool.query('SELECT * FROM wp_user', function (err, result) {
        if (err) {
            console.error({ error: err });
            errors(error);
        }
        else {
            console.log({ getUsers: result.rows[0] });
            return result(result.rows[0]);
        }
    });
}

module.exports = { getUsers };