import Bookshelf from '../config/db';

const ItemTag = Bookshelf.Model.extend({
  tableName: 'item_tag',
	hasTimestamps: true,
}, {});

export default Bookshelf.model('ItemTag', ItemTag);
