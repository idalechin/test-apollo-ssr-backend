import Bookshelf from '../config/db';

const Wedding = Bookshelf.Model.extend({
  tableName: 'wedding',
	hasTimestamps: true,

  style: function() {
    return this.belongsTo('WeddingStyle', 'style_id', 'id');
  },

  vendors: function () {
    return this.belongsToMany('Vendor', 'wedding_vendor', 'wedding_id', 'vendor_id', 'id')
  },

  media: function () {
    return this.hasMany('Media').through('WeddingMedia', 'id', 'wedding_id', 'media_id', 'id').withPivot(['wedding_id']);
  },

  engagement_media: function () {
    return this.hasMany('Media').through('EngagementMedia', 'id', 'wedding_id', 'media_id', 'id').withPivot(['wedding_id']);
  },

  venue: function() {
    return this.belongsTo('Vendor', 'venue_id', 'id');
  },

  cover: function() {
    return this.hasOne('Media', 'id', 'cover_id');
  },

  couple_pic: function() {
    return this.hasOne('Media', 'id', 'couple_pic_id');
  },

  collaborators: function() {
    return this.hasMany('WeddingCollaborators');
  },

  owner: function() {
    return this.belongsTo('User', 'owner_id', 'id');
  },

  likes: function() {
    return this.hasMany('User').through('FavoriteWeddings', 'id', 'wedding_id', 'account_id', 'id');
  }

}, {});

export default Bookshelf.model('Wedding', Wedding);