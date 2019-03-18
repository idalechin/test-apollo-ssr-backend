import Bookshelf from '../config/db';

const VendorSpecificFieldsOptions = Bookshelf.Model.extend({
	tableName: 'vendor_specific_fields_options',
	hasTimestamps: true,
}, {});

export default Bookshelf.model('VendorSpecificFieldsOptions', VendorSpecificFieldsOptions);
