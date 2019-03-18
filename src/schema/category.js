import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		category: [Category]
	}

	type Category {
		id: ID!
		category: String
		type: String
		singular: String
	}
`;
