import { ApolloServer, gql } from "apollo-server";

const user = {
    firstName: "yeongyin",
    lastName: "Kim",
    age: 26,
};

const typeDefs = gql`
    type User {
        firstName: String!
        lastName: String!
        fullName: String!
        age: Int!
    }
    type Query {
        author: User!
    }
    type Mutation {
        gettingOld: User!
        gettingYoung: User!
        resetAge: User!
    }
`;

const resolvers = {
    Query: {
        author() {
            return user;
        },
    },
    Mutation: {
        gettingOld() {
            user.age++;
            return user;
        },
        gettingYoung() {
            user.age--;
            return user;
        },
        resetAge() {
            user.age = 26;
            return user;
        },
    },
    User: {
        fullName({ firstName, lastName }) {
            return `${firstName} ${lastName}`;
        },
    },
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
    console.log(`running on ${url}`);
});
