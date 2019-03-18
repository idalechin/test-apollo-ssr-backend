import Bookshelf from '../config/db';

const DeviceToken = Bookshelf.Model.extend({
  tableName: 'device_token',
	hasTimestamps: true
}, {});

export default Bookshelf.model('DeviceToken', DeviceToken);