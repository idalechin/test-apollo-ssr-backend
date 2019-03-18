import { gql } from "apollo-server-express";

import userSchema from "./user";
import vendorSchema from "./vendor";
import mediaSchema from "./media";
import categoryScema from './category'

const linkSchema = gql`
	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}
`;

export default [linkSchema, userSchema, vendorSchema, mediaSchema, categoryScema];
