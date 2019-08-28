const server = require('./api/server.js');

const port = process.env.PORT || 4000;

server.listen(port, (req, res) => {
  console.log(`***** Listening on port ${port} *****`);
})