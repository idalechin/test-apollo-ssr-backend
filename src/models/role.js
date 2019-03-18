import Bookshelf from '../config/db';

const Role = Bookshelf.Model.extend({
  tableName: 'role'
});

export default Bookshelf.model('Role', Role);
