import Bookshelf from '../config/db';
import User from './user';

const MyWeddingLocations = Bookshelf.Model.extend({
  tableName: 'my_wedding_locations',
	hasTimestamps: true
}, {});

export default Bookshelf.model('MyWeddingLocations', MyWeddingLocations);
