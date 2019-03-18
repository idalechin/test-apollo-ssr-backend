import Bookshelf from '../config/db';

const InstagramWedding = Bookshelf.Model.extend({
  tableName: 'instagram_wedding',
	hasTimestamps: true,

  vendors: function () {
    return this.belongsToMany('Vendor', 'instagram_wedding_vendor', 'instagram_wedding_id', 'vendor_id', 'id')
  },

  venue: function() {
    return this.belongsTo('Vendor', 'venue_id', 'id');
  },

}, {});

export default Bookshelf.model('InstagramWedding', InstagramWedding);