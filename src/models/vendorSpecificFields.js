import Bookshelf from '../config/db';

const VendorSpecificFields = Bookshelf.Model.extend({
	tableName: 'vendor_specific_fields',
	hasTimestamps: true,
	category: function() {
		return this.belongsTo('Category');
	},
	options: function() {
		return this.hasMany('VendorSpecificFieldsOptions');
	}
}, {});

export default Bookshelf.model('VendorSpecificFields', VendorSpecificFields);
