import Bookshelf from '../config/db';

const Notification = Bookshelf.Model.extend({
  tableName: 'notifications',
	hasTimestamps: true,
},{
	jsonColumns: ['data']
});

export default Bookshelf.model('Notification', Notification);
