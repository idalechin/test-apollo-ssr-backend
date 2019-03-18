import Bookshelf from '../config/db';

const FacebookId = Bookshelf.Model.extend({
	tableName: 'facebook_id',
	hasTimestamps: true
}, {});

export default Bookshelf.model('FacebookId', FacebookId);