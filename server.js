// server.js
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const cors = require('cors');

const coursesData = [
  { title: 'Master Java Programming - Complete Beginner to Advanced', price: '₹1999' },
  { title: 'Data Structures and Algorithms - Self Paced', price: '₹3999' },
];

// GraphQL schema
const schema = buildSchema(`
  type Course {
    title: String
    price: String
  }

  type Query {
    courses: [Course]
  }
`);

// GraphQL root level resolver 
const root = {
  courses: () => coursesData,
};

// Express server
const app = express();

// Enable CORS
app.use(cors());

// GraphQL endpoint
app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}/graphql`);
});
