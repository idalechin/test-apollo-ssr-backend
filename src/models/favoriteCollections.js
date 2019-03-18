import Bookshelf from '../config/db';

const FavoriteCollections = Bookshelf.Model.extend({
	tableName: 'favorite_collections',
	hasTimestamps: true
}, {});

export default Bookshelf.model('FavoriteCollections', FavoriteCollections);