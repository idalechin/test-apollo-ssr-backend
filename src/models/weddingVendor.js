import Bookshelf from '../config/db';

const WeddingVendor = Bookshelf.Model.extend({
  tableName: 'wedding_vendor',
  hasTimestamps: true,
  
  vendor: function () {
    return this.hasOne('Vendor', 'id', 'vendor_id');
  }
}, {});

export default Bookshelf.model('WeddingVendor', WeddingVendor);
