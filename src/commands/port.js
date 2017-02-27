const ActiveConnector = require('../connector/active');

module.exports = function ({command} = {}) {
  this.connector = new ActiveConnector(this);
  const rawConnection = command._[1].split(',');
  if (rawConnection.length !== 6) return this.reply(425);

  const ip = rawConnection.slice(0, 4).join('.');
  const portBytes = rawConnection.slice(4).map(p => parseInt(p));
  const port = portBytes[0] * 256 + portBytes[1];

  return this.connector.setupConnection(ip, port)
  .then(socket => {
    return this.reply(200);
  })
}
