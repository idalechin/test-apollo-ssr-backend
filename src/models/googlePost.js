import Bookshelf from '../config/db';

const GooglePost = Bookshelf.Model.extend({
	tableName: 'google_post',
	hasTimestamps: true,
}, {});

export default Bookshelf.model('GooglePost', GooglePost);