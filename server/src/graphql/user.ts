import { makeExecutableSchema } from "@graphql-tools/schema";

import { addUser, deleteUser, getUser, getUserList, updateUser } from "../controllers/UserController";

const typeDefs = `#graphql
  type User {
    id: Int
    userName: String
    firstName: String
    lastName: String
  }

  input IUser {
    userName: String
    firstName: String
    lastName: String
  }

  input UUser {
    id: Int
    userName: String
    firstName: String
    lastName: String
  }

  type Query {
    users: [User!]!
    user(id: Int!): User
  }

  type Mutation {
    addUser(data: IUser): [User!]!
    updateUser(data: UUser): [User!]!
    deleteUser(id: Int!): [User!]!
  }
`;

const resolvers = {
  Query: {
    users: getUserList,
    user: getUser
  },

  Mutation: {
    addUser: addUser,
    updateUser: updateUser,
    deleteUser: deleteUser,
  }
}

const schema = makeExecutableSchema({
  resolvers,
  typeDefs
});

export default schema;