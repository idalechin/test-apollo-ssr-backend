import Bookshelf from '../config/db';

const WeddingStyle = Bookshelf.Model.extend({
  tableName: 'wedding_style',
	hasTimestamps: true
}, {});

export default Bookshelf.model('WeddingStyle', WeddingStyle);