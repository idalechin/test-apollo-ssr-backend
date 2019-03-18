import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		vendors(
			sortBy: String
			category: [String]
			price: [Int]
			distance: [Int]
			isVenues: Boolean
			offset: Int
			limit: Int
		): VendorsList
		vendor(slug: String!): Vendor
		vendorIsSaved(id: ID!): VendorSaved
	}

	type VendorsList {
		id: String
		list: [Vendor]
		pagination: Pagination
	}

	extend type Mutation {
		createVendor(title: String, user_id: ID!): Vendor!
		updateVendor(id: ID!): [Int!]!
		deleteVendor(id: ID!): Int!
		cleanVendorsCache: Boolean
		toogleVendorSave(id: ID!): VendorSaved
	}

	type Pagination {
		offset: Int
		limit: Int
		rowCount: Int
		pageCount: Int
	}

	type VendorSaved {
		id: ID!
		value: Boolean!
	}

	type Vendor {
		id: ID!
		title: String
		slug: String!
		user_id: ID
		user: User
		category_id: Int
		media(count: Int): [Media]
		price_level: Int
		about: String
		state: String
		city: String
		category: Category
	}
`;
