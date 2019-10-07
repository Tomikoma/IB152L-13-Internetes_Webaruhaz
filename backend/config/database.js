const sql = require('mssql')
const config = {
    user: 'sa',
    password: 'Object==0;',
    server: 'DESKTOP-IMSMEOB\\SQLEXPRESS',
    database: 'webshop',
    port: '1433'
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}
