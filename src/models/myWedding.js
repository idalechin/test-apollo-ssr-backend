import Bookshelf from '../config/db';

const MyWedding = Bookshelf.Model.extend({
  tableName: 'my_wedding',
	hasTimestamps: true,
  venue: function() {
    return this.hasOne('Vendor', 'id', 'venue_id');
  },
  locations: function(){
    return this.hasMany('MyWeddingLocations', 'my_wedding_id', 'id');
  }
}, {});

export default Bookshelf.model('MyWedding', MyWedding);
