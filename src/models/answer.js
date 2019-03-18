import Bookshelf from '../config/db';

const Answer = Bookshelf.Model.extend({
  tableName: 'answer',
  hasTimestamps: true,
}, {});

export default Bookshelf.model('Answer', Answer);