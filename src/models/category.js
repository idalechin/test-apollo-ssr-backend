import Bookshelf from '../config/db';

const Category = Bookshelf.Model.extend({
  tableName: 'category',
	hasTimestamps: true,
  vendor: function() {
    return this.hasMany('Vendor');
  },
  vendor_specific_fields: function() {
    return this.hasMany('VendorSpecificFields');
  }
}, {});

export default Bookshelf.model('Category', Category);
