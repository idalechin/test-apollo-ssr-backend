import fs from 'fs';

import config from '../config/config';
import Bookshelf from '../config/db';

const tableName = 'media';

const Media = Bookshelf.Model.extend({
  tableName: tableName,
	hasTimestamps: true,
  hidden: ['aws_internals', 'raw_properties'/*, 'source'*/],
  virtuals: {
    properties: function() {
      const raw_properties = this.related('raw_properties');
      const fields = raw_properties.toJSON();
      if(!fields || !fields.length) return null;

      const object = {};
      fields.forEach((field) => {object[field.name] = field._pivot_value});
      return object;
    }
  },
  initialize: function() {
    Bookshelf.Model.prototype.initialize.apply(this, arguments);
  },
  tags: function() {
    return this.hasMany('MediaTag', 'media_id', 'id');
  },

  item_tags: function() {
    return this.hasMany('MediaItemTag', 'media_id', 'id');
  },

  wedding: function(){
    return this.hasOne('Wedding').through('WeddingMedia', 'id', 'media_id', 'wedding_id', 'id');
  },

  vendors: function(){
    return this.hasMany('Vendor').through('VendorMedia', 'id', 'media_id', 'vendor_id', 'id');
  },

	likes: function(){
		return this.hasMany('User').through('FavoriteMedia', 'id', 'media_id', 'account_id', 'id');
  },

  raw_properties: function(){
    return this.hasMany('Property').through('PropertyValue', 'id', 'media_id', 'property_id', 'id').withPivot(['value']);
  },

  questions: function() {
    return this.hasMany('Question', 'media_id', 'id');
  },

  owner: function() {
  	return this.belongsTo('User', 'owner_id', 'id');
	},

},  {
  jsonColumns: ['images', 'aws_internals']
});

export default Bookshelf.model('Media', Media);
