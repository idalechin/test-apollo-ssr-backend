import Bookshelf from '../config/db';

const Facebook = Bookshelf.Model.extend({
	tableName: 'facebook',
	hasTimestamps: true
}, {});

export default Bookshelf.model('Facebook', Facebook);