import Bookshelf from '../config/db';

const tableName = 'property';

const Property = Bookshelf.Model.extend({
	tableName: tableName,
	hasTimestamps: true,
	value: function() {
		return this.hasMany('PropertyValue', 'id', 'property_id');
	},
	initialize: function() {
		Bookshelf.Model.prototype.initialize.apply(this, arguments);
	}
});

module.exports = Bookshelf.model('Property', Property);
