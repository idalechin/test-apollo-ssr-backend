import Bookshelf from '../config/db';

const FavoriteVendors = Bookshelf.Model.extend({
	tableName: 'favorite_vendors',
	hasTimestamps: true
}, {});

export default Bookshelf.model('FavoriteVendors', FavoriteVendors);