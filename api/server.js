import express from 'express';
import GraphQLHTTP from 'express-graphql';
import Schema from '../api/graphql';
import path from 'path';

let app = express();

// Serve our React client on through the root path
app.use(express.static(path.join(__dirname, '../public')));

// Our GraphQL endpoint that serves as an interface to all our models
app.use('/gateway', GraphQLHTTP({
  schema: Schema,
  pretty: process.env.DEV,
  graphiql: process.env.DEV
}));

// Get out server listening on a given port
app.listen(process.env.PORT || 8000, () => {
	console.log('Server is up and running 🍲');
});
