import Bookshelf from '../config/db';

const BrandTag = Bookshelf.Model.extend({
  tableName: 'brand_tag',
	hasTimestamps: true,
}, {});

export default Bookshelf.model('BrandTag', BrandTag);
