import Bookshelf from '../config/db';

const Promo = Bookshelf.Model.extend({
	tableName: 'promo',
	hasTimestamps: true,
});

export default Bookshelf.model('Promo', Promo);
