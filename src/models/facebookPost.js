import Bookshelf from '../config/db';

const FacebookPost = Bookshelf.Model.extend({
	tableName: 'facebook_post',
	hasTimestamps: true
}, {});

export default Bookshelf.model('FacebookPost', FacebookPost);