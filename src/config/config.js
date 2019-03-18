const env = process.env.NODE_ENV;
const config = require('./env/' + env + '.js');

export default config;