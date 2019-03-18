import Bookshelf from '../config/db';

const FacebookConnectHash = Bookshelf.Model.extend({
  tableName: 'facebook_connect_hash',
	hasTimestamps: true,
  user: function() {
    return this.belongsTo('User', 'user_id', 'id');
  },
}, {});

export default Bookshelf.model('FacebookConnectHash', FacebookConnectHash);