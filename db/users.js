

const POOLS = require('../db/postgress/connection');
const getUsers = (request, response) => {
    POOLS.pool.query('SELECT * FROM wp_user ORDER BY ID ASC', (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows[0])
    })
  }
  

module.exports = { getUsers };