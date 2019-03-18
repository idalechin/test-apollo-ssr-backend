import Bookshelf from '../config/db';

const TwitterPost = Bookshelf.Model.extend({
	tableName: 'twitter_post',
	hasTimestamps: true,
	hidden: [
		'twitter_access_token_secret',
		'twitter_request_token',
		'twitter_request_token_secret'
	],
}, {});

export default Bookshelf.model('TwitterPost', TwitterPost);