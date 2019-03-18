import Bookshelf from '../config/db';

const FoursquarePost = Bookshelf.Model.extend({
	tableName: 'foursquare_post',
	hasTimestamps: true
}, {});

export default Bookshelf.model('FoursquarePost', FoursquarePost);