import Bookshelf from '../config/db';

const VendorSpecificFieldsValues = Bookshelf.Model.extend({
	tableName: 'vendor_specific_fields_values',
	hasTimestamps: true,
	vendor: function() {
		return this.belongsTo('Vendor');
	},
	field: function(){
		return this.belongsTo('VendorSpecificField');
	}
}, {});

export default Bookshelf.model('VendorSpecificFieldsValues', VendorSpecificFieldsValues);
