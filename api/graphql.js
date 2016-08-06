import {
	GraphQLObjectType,
	GraphQLInt,
	GraphQLFloat,
	GraphQLString,
	GraphQLList,
	GraphQLSchema,
	GraphQLNonNull,
	GraphQLBoolean
} from 'graphql';
import db from '../models/schema';

// Business GraphQL type
const Business = new GraphQLObjectType({
	name: 'Business',
	description: 'This represents a business',
	fields: () => {
		return {
			id: {
				type: GraphQLInt,
				resolve(business) {
					return business.id;
				}
			},
			name: {
				type: GraphQLString,
				resolve(business) {
					return business.name;
				}
			},
			address: {
				type: GraphQLString,
				resolve(business) {
					return business.address;
				}
			},
			category: {
				type: GraphQLString,
				resolve(business) {
					return business.category;
				}
			},
			description: {
				type: GraphQLString,
				resolve(business) {
					return business.description;
				}
			},
			latitude: {
				type: GraphQLFloat,
				resolve(business) {
					return business.latitude;
				}
			},
			longitude: {
				type: GraphQLFloat,
				resolve(business) {
					return business.longitude;
				}
			},
			createdAt: {
				type: GraphQLString,
				resolve(business) {
					return business.createdAt;
				}
			},
			updatedAt: {
				type: GraphQLString,
				resolve(business) {
					return business.updatedAt;
				}
			}
		}
	}
});

/* Our root query types */
const Query = new GraphQLObjectType({
	name: 'Query',
	description: 'This is a root query',
	fields: () => {
		return {
			businesses: {
				type: new GraphQLList(Business),
				args: {
					id: {
						type: GraphQLInt
					}
				},
				resolve(root, args) {
					return db.models.business.findAll({
						where: args
					});
				}
			}
		}
	}
});

// Our root Mutation
const Mutation = new GraphQLObjectType({
	name: 'Mutation',
	description: 'Hooks to create data',
	fields: () => {
		return {
			createBusiness: {
				type: Business,
				args: {
					name: { type: new GraphQLNonNull(GraphQLString) },
					address: { type: new GraphQLNonNull(GraphQLString) },
					category: { type: new GraphQLNonNull(GraphQLString) },
					description: { type: new GraphQLNonNull(GraphQLString) },
					latitude: { type: new GraphQLNonNull(GraphQLFloat) },
                    longitude: { type: new GraphQLNonNull(GraphQLFloat) }
				},
				resolve(_, args) {
					return db.models.business.create({
                        name: args.name,
                        address: args.address,
                        category: args.category,
                        description: args.description,
                        latitude: args.latitude,
                        longitude: args.longitude
                    });
				}
			},
			deleteBusiness: {
				type: Business,
				args: {
					id: { type: new GraphQLNonNull(GraphQLInt) }
				},
				resolve(_, args){
					return db.models.business.destroy({
						where: {id: args.id}
					});
				}
			},
			updateBusiness: {
				type: Business,
				args: {
					name: { type: new GraphQLNonNull(GraphQLString) },
					pictureUrl: { type: new GraphQLNonNull(GraphQLString) },
					handle: { type: new GraphQLNonNull(GraphQLString) },
					id: { type: new GraphQLNonNull(GraphQLInt) }
				},
				resolve(_, args){
					return db.models.user.update({
						name: args.name,
						pictureUrl: args.pictureUrl,
						handle: args.handle
					}, {
						where: {id: args.id}
					});
				}
			}
		}
	}
});

const Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation
});

export default Schema;
