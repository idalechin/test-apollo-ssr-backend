import Bookshelf from "../config/db";
import User from "../models/user";
import Vendor from "../models/vendor";
import HiredVendors from "../models/hiredVendors";
import Category from "../models/category";

import CacheService from "../services/cache";

export default {
	Query: {
		vendors: async (parent, args) => {
			const resolver = async (args, hash) => {
				const {
					offset = 0,
					limit = 10,
					sortBy,
					category,
					price,
					distance,
					isVenues
				} = args;
				const start = new Date().getTime();

				let filter = {};

				if (category && category.length) {
					filter.category_id = category;
				}

				if (price && price.length) {
					filter.price_level = price;
				}

				if (distance && +distance && +distance >= 25 && +distance <= 100) {
					filter.distance = +distance;
				} else {
					filter.distance = 25;
				}

				try {
					const vendors = await new Vendor()
						.query(qb => {
							qb.select([
								"vendor.id",
								"vendor.title",
								"vendor.price_level",
								"vendor.slug",
								"vendor.city",
								"vendor.state",
								"vendor.address",
								Bookshelf.knex.raw("COUNT(wv.wedding_id) > 0 as wedding_cnt"),
								Bookshelf.knex.raw("COUNT(vm.media_id) as media_cnt"),
								Bookshelf.knex.raw(
									'IF( (yelp.image IS NOT NULL AND yelp.image != "") , 1, 0) as has_yelp_image'
								),
								Bookshelf.knex.raw(
									"IF((vendor.user_id IS NOT NULL), 1, 0) as has_real_user"
								)
							]);
							if (!isVenues) {
								qb.where("category_id", "!=", 1);
							}
							qb.whereRaw("IF((ts.user_id IS NOT NULL), false, true)");

							qb.leftJoin("wedding_vendor as wv", "vendor.id", "wv.vendor_id");
							qb.leftJoin("yelp_id as yId", "vendor.id", "yId.vendor_id");
							qb.leftJoin("yelp as yelp", "yId.id", "yelp.yelp_id");
							qb.leftJoin("vendor_media as vm", "vendor.id", "vm.vendor_id");
							qb.leftJoin("test_user as ts", "vendor.user_id", "ts.user_id");

							if (!sortBy || sortBy === "match") {
								qb.orderBy("media_cnt", "DESC");
								qb.orderBy("wedding_cnt", "DESC");
								qb.orderBy("has_yelp_image", "DESC");
								qb.orderBy("yelp.yelp_review_count", "DESC");
							}

							if (sortBy === "rate") {
								qb.orderBy("wedding_cnt", "DESC");
								qb.orderBy("has_yelp_image", "DESC");
								qb.orderBy("yelp.rating", "DESC");
							}

							if (sortBy === "review") {
								qb.orderBy("yelp.yelp_review_count", "DESC");
							}

							qb.groupBy("vendor.id");
							qb.distinct("vendor.id");

							if (filter.category_id) {
								qb.whereIn("category_id", filter.category_id);
							}
							if (filter.price_level) {
								qb.whereIn("price_level", filter.price_level);
							}
							if (filter.locations) {
								qb.where(function() {
									const loc = filter.locations;
									if (loc && +loc.lat && +loc.lng) {
										const { lat, lng } = loc;

										const rawWhere = `
								( 3959 * acos( cos( radians(:lat) )
									* cos( radians( vendor.lat ) )
									* cos( radians( vendor.lng ) - radians(:lng) )
									+ sin( radians(:lat) )
									* sin( radians( vendor.lat ) ) ) ) < :distance
							`;

										this.whereRaw([
											Bookshelf.knex.raw(rawWhere, {
												lat,
												lng,
												distance: filter.distance
											})
										]);
									}
								});
							}
						})
						.fetchPage({
							offset,
							limit
						});

					if (vendors && vendors.length) {
						const finish = new Date().getTime() - start;
						console.log("finish", finish);

						return { id: hash, list: vendors.toJSON(), pagination: vendors.pagination };
					} else {
						return [];
					}
				} catch (err) {
					console.log(err.message);
					console.log(err.stack);

					return [];
				}
			};

			return await CacheService.checkCache({
				hashPrefix: "vendors-",
				args,
				resolver
			});
		},
		vendor: async (parent, { slug }, { models }) =>
			await Vendor.where({ slug })
				.fetch()
				.then(vendor => vendor && vendor.toJSON()),
		vendorIsSaved: async (parent, { id }, { user }) => {
			const user_id = user && user.get('id')
			let isSaved = {
				id,
				value: false
			}

			if(!id || !user_id) {
				return isSaved;
			}

			const hired = await new HiredVendors({account_id: user_id, vendor_id: id}).fetch();

			if(hired){
				isSaved.value = true
				return isSaved
			}

			return isSaved
		}		
	},

	Mutation: {
		createVendor: (parent, { title, user_id }, { db }, info) =>
			Vendor({
				title: title,
				user_id: user_id
			}).save(),
		updateVendor: (parent, { title, id }, { db }, info) =>
			Vendor.where({ id }).save({ title }),
		deleteVendor: (parent, { id }, { db }, info) =>
			Vendor.where({ id }).destroy(),
		cleanVendorsCache: () => {
			CacheService.deleteByKey('vendors*')
			return true
		},
		toogleVendorSave: async (parent, { id }, { user }) => {
			const user_id = user && user.get('id')
			let isSaved = {
				id,
				value: false
			}

			if(!id || !user_id) {
				return isSaved;
			}
		
			const vendor = await new Vendor({id}).fetch();
		
			if(!vendor){
				return isSaved;
			}

			const hired = await new HiredVendors({account_id: user_id, vendor_id: id}).fetch();

			if(!hired){
				const isHired = await new HiredVendors({account_id: user_id, vendor_id: id}).save();
				isSaved.value = !!isHired
				return isSaved
			}

			hired.destroy();

			return isSaved
		}
	},

	Vendor: {
		user: async (vendor, args, { models }) => {
			return await User.where({ id: vendor.user_id })
				.fetchAll()
				.then(user => user && user.toJSON());
		},
		media: async (vendor, {count = 20}, { models }) => {
			const vendorModel = await new Vendor().where({ id: vendor.id }).fetch({
				withRelated: [
					{
						media: q => {
							q.columns([
								"media.id",
								"wedding_id",
								"source",
								"images",
								"isVideo",
								"video_hashed_id",
								"video_thumbnail",
								"mosaic_media",
								"is_engagement_media",
								"media.owner_id"
							]);
							q.orderBy("wedding_id", "DESC").orderBy("sort", "ASC");
							q.limit(count);
						}
					}
				]
			});
			if (!vendorModel) return null;
			const vendorJSON = vendorModel.toJSON();
			const media = vendorJSON.media;
			return media;
		},
		category: async (vendor, args, { models }) => {
			return await Category.where({ id: vendor.category_id })
				.fetch()
				.then(category => category && category.toJSON());
		}
	}
};

