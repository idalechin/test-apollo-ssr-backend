import Bookshelf from '../config/db';

const RecentSearch = Bookshelf.Model.extend({
  tableName: 'recent_search',
	hasTimestamps: true,
}, {});

export default Bookshelf.model('RecentSearch', RecentSearch);