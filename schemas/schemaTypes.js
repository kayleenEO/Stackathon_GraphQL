const graphql = require("graphql");
const axios = require("axios");
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = graphql;

const StudentType = new GraphQLObjectType({
  name: "Student",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    approxAge: { type: GraphQLInt },
    instructorId: { type: GraphQLString },
    instructor: {
      type: InstructorType,
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/instructors/${parentValue.instructorId}/`)
          .then(res => res.data);
      }
    }
  })
});

const InstructorType = new GraphQLObjectType({
  name: "Instructor",
  fields: () => ({
    id: { type: GraphQLString },
    firstName: { type: GraphQLString },
    approxAge: { type: GraphQLInt },
    students: {
      type: new GraphQLList(StudentType),
      resolve(parentValue, args) {
        return axios
          .get(`http://localhost:3000/instructors/${parentValue.id}/students`)
          .then(res => res.data);
      }
    }
  })
});

module.exports = { StudentType, InstructorType };
