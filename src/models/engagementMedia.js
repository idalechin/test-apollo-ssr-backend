import Bookshelf from '../config/db';
import Media from './media';

const EngagementMedia = Bookshelf.Model.extend({
  tableName: 'engagement_media',
	hasTimestamps: true
}, {});

export default Bookshelf.model('EngagementMedia', EngagementMedia);