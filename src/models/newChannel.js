import Bookshelf from '../config/db';

const NewChannel = Bookshelf.Model.extend({
  tableName: 'new_channel',
	hasTimestamps: true
}, {});

export default Bookshelf.model('NewChannel', NewChannel);