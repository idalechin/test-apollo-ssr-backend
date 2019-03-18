import Media from '../models/media'

export default {
	Query: {
		media: async (parent, { id }, { models }) =>
			await Media.where({ id }).fetch().then(media => media && media.toJSON()),
	},

	Media: {
		vendors: async (media, args, { models }) => {
			return await media.related("vendors")
				.then(vendors => vendors.toJSON());
		}
	}
};