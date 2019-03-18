import Bookshelf from '../config/db';

const VendorReview = Bookshelf.Model.extend({
  tableName: 'vendor_review',
  hasTimestamps: true,
  user: function() {
    return this.hasOne('User', 'id', 'user_id');
  },
}, {});

export default Bookshelf.model('VendorReview', VendorReview);
