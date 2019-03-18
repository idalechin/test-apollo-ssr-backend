import Bookshelf from '../config/db';

const Inspired = Bookshelf.Model.extend({
  tableName: 'inspired',
}, {});

export default Bookshelf.model('Inspired', Inspired);
