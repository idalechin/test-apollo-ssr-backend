import Bookshelf from '../config/db';

const MatchQuestions = Bookshelf.Model.extend({
  tableName: 'match_questions'
}, {});

export default Bookshelf.model('MatchQuestions', MatchQuestions);