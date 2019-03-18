import bcrypt from "bcrypt-nodejs";
import Bookshelf from "../config/db";
import TestUser from "../models/testUser";

const User = Bookshelf.Model.extend(
	{
		tableName: "user",
		hasTimestamps: true,
		hidden: ["password"],
		virtuals: {
			password_is_empty: function() {
				return !this.get("password");
			},
			full_name: function() {
				return this.get("first_name") + " " + this.get("last_name");
			}
		},
		initialize: function() {
			this.on("creating", this.hashPassword, this);
			this.on("updating", this.hashPassword, this);
		},

		vendor: function() {
			return this.hasOne("Vendor");
		},

		collections: function() {
			return this.hasMany("Collection", "account_id", "id");
		},
		guestCollections: function() {
			return this.hasMany("Collection").through(
				"CollectionCollaborator",
				"id",
				"user_id",
				"collection_id",
				"id"
			);
		},
		userpic: function() {
			return this.hasOne("Media", "id", "userpic_id");
		},
		role: function() {
			return this.hasOne("Role", "id", "role_id");
		},
		test_user: function() {
			return this.hasOne("TestUser", "user_id", "id");
		},
		reviewed_vendors: function() {
			return this.hasMany("VendorReview", "user_id", "id");
		},
		facebookConnectHash: function() {
			return this.hasOne("FacebookConnectHash");
		},
		weddings: function() {
			return this.hasMany("Wedding", "owner_id", "id");
		},
		collaboratedWeddings: function() {
			return this.hasMany("Wedding").through(
				"WeddingCollaborators",
				"id",
				"collaborator_id",
				"wedding_id",
				"id"
			);
		},
		favoriteWeddings: function() {
			return this.hasMany("Wedding").through(
				"FavoriteWeddings",
				"id",
				"account_id",
				"wedding_id",
				"id"
			);
		},
		favoriteCollections: function() {
			return this.hasMany("Collection")
				.through(
					"FavoriteCollections",
					"id",
					"account_id",
					"collection_id",
					"id"
				)
				.query(q => {
					q.where("is_private", 0);
				});
		},
		favoriteMedia: function() {
			return this.hasMany("Media").through(
				"FavoriteMedia",
				"id",
				"account_id",
				"media_id",
				"id"
			);
		},
		favoriteVendors: function() {
			return this.hasMany("Vendor").through(
				"FavoriteVendors",
				"id",
				"account_id",
				"vendor_id",
				"id"
			);
		},
		hiredVendors: function() {
			return this.hasMany("Vendor").through(
				"HiredVendors",
				"id",
				"account_id",
				"vendor_id",
				"id"
			);
		},
		myWedding: function() {
			return this.hasOne("MyWedding", "account_id", "id");
		},
		hashPassword: function(model, attrs, options) {
			let password = null;

			if (options.method === "insert") {
				password = model.attributes.password;
			} else {
				password = attrs.password;
			}

			if (!password) return;

			return new Promise((resolve, reject) => {
				bcrypt.genSalt(10, function(err, salt) {
					if (err) {
						return reject(err);
					}
					bcrypt.hash(password, salt, null, function(err, hash) {
						if (err) {
							return reject(err);
						}
						model.set("password", hash);
						resolve(hash);
					});
				});
			});
		}
	},
	{
		checkPassword: function(email, password) {
			return new Promise((resolve, reject) => {
				if (!email.toString().trim() || !password.toString().trim()) {
					reject("Email and password are both required");
				}

				new this({ email: email.toLowerCase().trim() })
					.fetch()
					.then(function(user) {
						if (!user || !user.get("password")) {
							return resolve(null);
						}

						return new Promise((resolve, reject) => {
							bcrypt.compare(
								password.toString(),
								user.get("password"),
								function(err, isMatch) {
									if (err) {
										reject(err);
									}

									if (isMatch) {
										resolve(user);
									} else {
										resolve(null);
									}
								}
							);
						});
					})
					.then(user => {
						resolve(user);
					})
					.catch(err => {
						throw new Error(err);
					});
			}).catch(err => {
				throw new Error(err);
			});
		}
	}
);

export default Bookshelf.model("User", User);
