import Bookshelf from '../config/db';

const TestUser = Bookshelf.Model.extend({
  tableName: 'test_user',
	hasTimestamps: true,
}, {});

export default Bookshelf.model('TestUser', TestUser);
