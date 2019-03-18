import Bookshelf from '../config/db';

const VendorMedias = Bookshelf.Model.extend({
  tableName: 'vendor_media',
	hasTimestamps: true
}, {});

export default Bookshelf.model('VendorMedia', VendorMedias);