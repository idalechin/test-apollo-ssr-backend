import Bookshelf from '../config/db';

const Yelp = Bookshelf.Model.extend({
	tableName: 'yelp',
	hasTimestamps: true
}, {});

export default Bookshelf.model('Yelp', Yelp);