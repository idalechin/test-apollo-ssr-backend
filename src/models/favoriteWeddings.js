import Bookshelf from '../config/db';

const FavoriteWeddings = Bookshelf.Model.extend({
	tableName: 'favorite_weddings',
	hasTimestamps: true,
}, {});

export default Bookshelf.model('FavoriteWeddings', FavoriteWeddings);