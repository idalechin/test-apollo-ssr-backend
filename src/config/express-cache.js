import config from './config';
const asyncRedis = require("async-redis");

const client = asyncRedis.createClient({
	host: config.redis.host,
	port: config.redis.port,
	expire: 3600,
	prefix: 'apollo-test-'
});

export default client;