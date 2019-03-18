import Bookshelf from '../config/db';

const YelpId = Bookshelf.Model.extend({
	tableName: 'yelp_id',
	hasTimestamps: true
}, {});

export default Bookshelf.model('YelpId', YelpId);