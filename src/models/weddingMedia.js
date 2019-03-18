import Bookshelf from '../config/db';
import Media from './media';

const WeddingMedia = Bookshelf.Model.extend({
  tableName: 'wedding_media',
	hasTimestamps: true
}, {});

export default Bookshelf.model('WeddingMedia', WeddingMedia);