import Bookshelf from '../config/db';

const HiredVendors = Bookshelf.Model.extend({
	tableName: 'hired_vendors',
	hasTimestamps: true
}, {});

export default Bookshelf.model('HiredVendors', HiredVendors);