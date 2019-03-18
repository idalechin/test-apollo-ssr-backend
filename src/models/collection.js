import Bookshelf from '../config/db';
import User from './user';

const Collection = Bookshelf.Model.extend({
  tableName: 'collection',
	hasTimestamps: true,
	hidden: ['collaborators_ids'],
	virtuals: {
  	invites : function() {
			const ids = this.related('collaborators_ids');
			const json = ids.toJSON();
			const invites = [];

			json.forEach(invite => {
				if(invite.collaborator_email){
					invites.push({id: invite.id, email: invite.collaborator_email});
				}
			});

			return invites;
		}
	},
	owner: function() {
  	return this.belongsTo('User', 'account_id', 'id');
	},
	collaborators_ids: function() {
		return this.hasMany('CollectionCollaborator', 'collection_id');
	},
  collaborators: function() {
		return this.hasMany('User', 'id').through('CollectionCollaborator', 'id', 'collection_id', 'user_id', 'id').withPivot(['collaborator_email']);
  },
  media: function() {
		return this.hasMany('Media', 'id').through('CollectionMedia', 'id', 'collection_id', 'media_id', 'id');
  },
	likes: function(){
		return this.hasMany('User').through('FavoriteCollections', 'id', 'collection_id', 'account_id', 'id');
	}
}, {});

export default Bookshelf.model('Collection', Collection);
