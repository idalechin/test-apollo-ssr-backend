import Bookshelf from '../config/db';

const MediaTag = Bookshelf.Model.extend({
  tableName: 'media_tags',
	hasTimestamps: true,
  media:  function() {
    return this.belongsTo('Media');
  },
}, {});

export default Bookshelf.model('MediaTag', MediaTag);
