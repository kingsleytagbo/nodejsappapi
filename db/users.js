

const POOLS = require('../db/postgress/connection');
const getUsers = () => {
    return POOLS.pool.query('SELECT * FROM wp_user', function (err, result) {
        if (err) {
            console.error({ error: err });
            throw err;
        }
        else {
            console.log({ getUsers: result.rows[0] });
            return result.rows[0];
        }
    });
}

module.exports = { getUsers };