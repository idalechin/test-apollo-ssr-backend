import Bookshelf from '../config/db';

const MessengerNotifications = Bookshelf.Model.extend({
  tableName: 'messenger_notifications',
	hasTimestamps: true,
}, {});

export default Bookshelf.model('MessengerNotifications', MessengerNotifications);
