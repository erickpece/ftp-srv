const PassiveConnector = require('../connector/passive');

module.exports = function ({command} = {}) {
  this.connector = new PassiveConnector(this);
  return this.connector.setupServer()
  .then(server => {
    const address = this.server.url.hostname;
    const {port} = server.address();
    const host = address.replace(/\./g, ',');
    const portByte1 = port / 256 | 0;
    const portByte2 = port % 256;

    return this.reply(227, `PASV OK (${host},${portByte1},${portByte2})`);
  });
}
