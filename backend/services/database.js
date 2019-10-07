const { poolPromise } = require('./../config/database')
/*
async function initialize() {
  const pool = await oracledb.createPool(dbConfig.hrPool);
}

module.exports.initialize = initialize;

async function close() {
  await oracledb.getPool().close();
}

module.exports.close = close;
*/

function simpleExecute(statement) {
  console.log("simpleExecute called")
  return new Promise(async (resolve, reject) => {
    try {
      //conn = await oracledb.getConnection();
      const pool = await poolPromise
      const result = await pool.request()
      .query(statement)
      //const result = await conn.execute(statement, binds, opts);

      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
}

module.exports.simpleExecute = simpleExecute;
