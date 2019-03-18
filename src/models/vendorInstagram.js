import Bookshelf from '../config/db';

const VendorInstagram = Bookshelf.Model.extend({
	tableName: 'vendor_instagram',
	hidden: ['access_token'],
	hasTimestamps: true
}, {});

export default Bookshelf.model('VendorInstagram', VendorInstagram);