import Bookshelf from '../config/db';

const FavoriteMedia = Bookshelf.Model.extend({
	tableName: 'favorite_media',
	hasTimestamps: true
}, {});

export default Bookshelf.model('FavoriteMedia', FavoriteMedia);