import Bookshelf from '../config/db';

const FacebookFriends = Bookshelf.Model.extend({
  tableName: 'facebook_friends',
	hasTimestamps: true,
  user: function () {
    return this.belongsTo('User', 'facebook_user_id', 'facebook_id');
  },
  friend: function (){
    return this.belongsTo('User', 'facebook_friend_id', 'facebook_id');
  }

}, {});

export default Bookshelf.model('FacebookFriends', FacebookFriends);
