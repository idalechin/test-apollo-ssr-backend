import Bookshelf from '../config/db';

const InstagramWeddingVendor = Bookshelf.Model.extend({
  tableName: 'instagram_wedding_vendor',
  hasTimestamps: true,
  
  vendor: function () {
    return this.hasOne('Vendor', 'id', 'vendor_id');
  }
}, {});

export default Bookshelf.model('InstagramWeddingVendor', InstagramWeddingVendor);
