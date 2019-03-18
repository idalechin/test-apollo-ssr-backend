import Bookshelf from '../config/db';

const CollectionCollaborator = Bookshelf.Model.extend({
  tableName: 'collection_media',
	hasTimestamps: true
}, {});

export default Bookshelf.model('CollectionMedia', CollectionCollaborator);