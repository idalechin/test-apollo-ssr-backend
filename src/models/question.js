import Bookshelf from '../config/db';
import Answer from './answer';

const Question = Bookshelf.Model.extend({
  tableName: 'question',
  hasTimestamps: true,

  answers: function() {
    return this.hasMany(Answer, 'question_id', 'id');
  },
  
}, {});

export default Bookshelf.model('Question', Question);