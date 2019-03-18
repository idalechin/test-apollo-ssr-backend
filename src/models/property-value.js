import Bookshelf from '../config/db';

const tableName = 'property_value';

const PropertyValue = Bookshelf.Model.extend({
	tableName: tableName,
	hasTimestamps: true,
	property: function() {
		return this.hasOne('Property', 'property_id', 'id');
	},
	media: function() {
		return this.hasOne('Media', 'media_id', 'id');
	},
	initialize: function() {
		Bookshelf.Model.prototype.initialize.apply(this, arguments);
	}
});

module.exports = Bookshelf.model('PropertyValue', PropertyValue);
