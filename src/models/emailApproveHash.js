import Bookshelf from '../config/db';

const EmailApproveHash = Bookshelf.Model.extend({
  tableName: 'email_approve_hash',
	hasTimestamps: true,
  user: function() {
    return this.belongsTo('User', 'user_id', 'id');
  },
}, {});

export default Bookshelf.model('EmailApproveHash', EmailApproveHash);