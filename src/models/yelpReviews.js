import Bookshelf from '../config/db';

const YelpReviews = Bookshelf.Model.extend({
	tableName: 'yelp_reviews',
	hasTimestamps: true,
}, {});

export default Bookshelf.model('YelpReviews', YelpReviews);