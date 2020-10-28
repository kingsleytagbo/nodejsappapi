

const POOLS = require('../db/postgress/connection');
const getUsers = () => {
    return POOLS.pool.query('SELECT * FROM wp_user', () => {
    });
}

module.exports = { getUsers };