import { gql } from "apollo-server-express";

export default gql`
	extend type Query {
		users: [User]
		user(id: ID!): User
		fetchMe: User
	}

	extend type Mutation {
		signIn(email: String!, password: String!): Token
	}

	type Token {
		token: String!
	}

	type User {
		id: ID!
		first_name: String
		last_name: String
		vendors: [Vendor]
	}
`;
