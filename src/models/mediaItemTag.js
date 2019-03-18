import Bookshelf from '../config/db';

const MediaItemTag = Bookshelf.Model.extend({
  tableName: 'media_item_tag',
  hasTimestamps: true,
  
  item: function() {
    return this.hasOne('ItemTag', 'id', 'item_tag_id');
  },
  brand: function() {
    return this.hasOne('BrandTag', 'id', 'brand_tag_id');
  },
}, {});

export default Bookshelf.model('MediaItemTag', MediaItemTag);
