import Bookshelf from '../config/db';

const MatchInvitation = Bookshelf.Model.extend({
  tableName: 'match_invitation',
	hasTimestamps: true
}, {});

export default Bookshelf.model('MatchInvitation', MatchInvitation);