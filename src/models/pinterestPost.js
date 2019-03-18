import Bookshelf from '../config/db';

const PinterestPost = Bookshelf.Model.extend({
	tableName: 'pinterest_post',
	hasTimestamps: true,
}, {});

export default Bookshelf.model('PinterestPost', PinterestPost);