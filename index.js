const app = require('./api')
const config = require('./config.js');

app.listen(config.port, () => console.log('Listening on port', config.port));
