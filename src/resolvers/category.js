import Category from '../models/category'

export default {
	Query: {
		category: async (parent, args, { models }) => await Category.fetchAll().then(category => category.toJSON()),
	}
};