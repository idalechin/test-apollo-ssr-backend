import Bookshelf from '../config/db';

const CollectionCollaborator = Bookshelf.Model.extend({
  tableName: 'collection_collaborator',
	hasTimestamps: true
}, {});

export default Bookshelf.model('CollectionCollaborator', CollectionCollaborator);