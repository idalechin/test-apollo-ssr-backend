import Bookshelf from '../config/db';

const BufferAccount = Bookshelf.Model.extend({
	tableName: 'buffer_account',
	hasTimestamps: true
}, {});

export default Bookshelf.model('BufferAccount', BufferAccount);