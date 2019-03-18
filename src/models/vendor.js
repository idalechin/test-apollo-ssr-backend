import Bookshelf from '../config/db';
import _find from 'lodash/find';

const Vendor = Bookshelf.Model.extend({
  tableName: 'vendor',
  hasTimestamps: true,
  virtuals: {
    specific_fields: function() {
      const specific_fields = this.related('vendor_specific_fields');
      const specific_fields_values = this.related('vendor_specific_fields_values');
      const fields = specific_fields.toJSON();
      const fields_values = specific_fields_values.toJSON();
      if(!fields || !fields.length) return null;

      const object = {};
			fields.forEach(field => {
        let values = fields_values && fields_values.filter(value => value.vendor_specific_field_id === field.id);

        const value = values && values[0] ? values[0].value : null;
        object[field.name] = field.type === 'select' ? +value : value

        if(field.type === 'multiselect'){
          const value = values.map(value => {
            const val = value && +value.value;
            const option = field && field.options && field.options.length ? _find(field.options, {id: val}) : null;
            return {
              id: val,
              option: option && option.option
            }
          });
          object[field.name] = value;
        }
      });
			return object;
    },
  },

  user: function () {
    return this.belongsTo('User');
  },

  cover: function () {
    return this.hasOne('Media', 'id', 'cover_image_id');
  },

  media: function () {
    return this.hasMany('Media', 'id').through('VendorMedia', 'id', 'vendor_id', 'media_id', 'id').withPivot(['wedding_id']);
  },

  weddings: function () {
    return this.hasMany('Wedding', 'id').through('WeddingVendor', 'id', 'vendor_id', 'wedding_id', 'id');
  },
	vendor_specific_fields: function() {
    return this.hasMany('VendorSpecificFields').through('VendorSpecificFieldsValues', 'id', 'vendor_id', 'vendor_specific_field_id', 'id').withPivot(['value']);
  },
  vendor_specific_fields_values: function() {
    return this.hasMany('VendorSpecificFieldsValues', 'vendor_id', 'id');
  },
  mosaic_media: function() {
    return this.hasMany('Media', 'id').through('VendorMosaicMedia', 'id', 'vendor_id', 'media_id', 'id');
  },
  yelp: function(){
    return this.hasOne('Yelp').through('YelpId', 'yelp_id').withPivot(['yelp_internal_id']);
  },
	yelp_reviews: function(){
		return this.hasMany('YelpReviews').through('YelpId', 'yelp_id').withPivot(['yelp_internal_id']);
	},
  yelp_id: function(){
		return this.hasOne('YelpId');
  },
  facebook: function(){
    return this.hasOne('Facebook').through('FacebookId', 'facebook_id').withPivot(['facebook_internal_id']);
  },
  facebook_id: function(){
		return this.hasOne('FacebookId');
  },
  reviews: function() {
    return this.hasMany('VendorReview', 'vendor_id', 'id');
  },
  instagram_connection: function() {
    return this.hasOne('VendorInstagram', 'vendor_id', 'id');
  },
}, {});

export default Bookshelf.model('Vendor', Vendor);
