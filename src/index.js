import { ApolloServer, gql } from "apollo-server-express";
import express from "express";
import { HTTP_API_PORT } from "./constants";
import passport from 'passport';


import schema from "./schema/index";
import resolvers from "./resolvers";
import registerModels from "./models/register_models";
import {checkAuth} from './utils/requireAuth'

require("./subscriptions");

const app = express();
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
registerModels();

const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	debug: true,
	context: ({req}) => ({ user: req.user }),
	playground: {
		endpoint: `http://localhost:${HTTP_API_PORT}/graphql`,
		settings: {
			"editor.theme": "dark"
		}
	},
});

app.use('/graphql', checkAuth);

server.applyMiddleware({ app }); // app is from an existing express app

app.listen({ port: HTTP_API_PORT }, () =>
	console.log(
		`🚀 Server ready at http://localhost:${HTTP_API_PORT}${server.graphqlPath}`
	)
);
