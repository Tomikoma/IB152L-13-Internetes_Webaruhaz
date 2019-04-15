const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');
const webServerConfig = require('../config/web-server');
const database = require('./database');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}))

    app.use((req,res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
    'Access-Control-Allow-Headers',
   'Origin, X-Requested-With, Content-Type, Accept');
    res.setHeader('Access-Control-Allow-Methods',
   'GET',
   'POST',
   'PATCH',
   'DELETE',
   'OPTIONS'
   );
  next();
})

    httpServer = http.createServer(app);

    app.get('/api/users', async (req, res, next) => {
      const result = await database.simpleExecute('SELECT * FROM Users');
      users=result.rows;
      res.status(200).json({
        message: 'Posts fetched succesfully!',
        users: users
      });
    });



    httpServer.listen(webServerConfig.port)
      .on('listening', () => {
        console.log(`Web server listening on localhost:${webServerConfig.port}`);

        resolve();
      })
      .on('error', err => {
        reject(err);
      });
  });
}

module.exports.initialize = initialize;

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }

      resolve();
    });
  });
}

module.exports.close = close;
