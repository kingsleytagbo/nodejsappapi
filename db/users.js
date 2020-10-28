

const pool = require('../db/postgress/connection');
const getUsers = () => {
    return pool.query('SELECT * FROM wp_user', () => {
    });
}

module.exports = { getUsers };