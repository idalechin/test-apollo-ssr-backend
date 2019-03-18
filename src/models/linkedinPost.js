import Bookshelf from '../config/db';

const LinkedinPost = Bookshelf.Model.extend({
	tableName: 'linkedin_post',
	hasTimestamps: true,
}, {});

export default Bookshelf.model('LinkedinPost', LinkedinPost);