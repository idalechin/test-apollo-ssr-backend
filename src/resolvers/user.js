import User from "../models/user";
import Vendor from "../models/vendor";
import jwt from "jwt-simple";
import config from "../config/config";

export default {
	Query: {
		users: async (parent, { offset = 0, limit = 10 }, { models }) =>
			await User.fetchPage({ offset, limit }).then(users => users.toJSON()),
		user: async (parent, { id }, { models }) =>
			await User.where({ id })
				.fetch()
				.then(user => user && user.toJSON()),
		fetchMe: async (parent, args, { models, user }) => {
			return user ? user.toJSON() : null;
		}
	},

	Mutation: {
		signIn: async (user, { email, password }, { models }) => ({
			token: tokenForUser(email)
		})
	},

	User: {
		vendors: async (user, args, { models }) => {
			return await Vendor.where({ user_id: user.id })
				.fetchAll()
				.then(vendors => vendors.toJSON());
		}
	}
};

export function tokenForUser(email) {
	const timestamp = new Date().getTime() / 1000;

	return jwt.encode(
		{
			sub: email,
			iat: timestamp,
			exp: timestamp + 60 * 60 * 24 * 31
		},
		config.jwtSecret
	);
}
