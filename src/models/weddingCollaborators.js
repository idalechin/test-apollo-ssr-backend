import Bookshelf from '../config/db';

const WeddingCollaborators = Bookshelf.Model.extend({
  tableName: 'wedding_collaborators',
	hasTimestamps: true,
  wedding: function() {
    return this.belongsTo('Wedding', 'wedding_id', 'id');
  },
  collaborator: function() {
    return this.belongsTo('User', 'user_id', 'id');
  }
}, {});

export default Bookshelf.model('WeddingCollaborators', WeddingCollaborators);