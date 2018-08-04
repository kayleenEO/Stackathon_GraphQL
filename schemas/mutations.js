const graphql = require("graphql");
const axios = require("axios");
const { StudentType, InstructorType } = require("./schemaTypes");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLNonNull
} = graphql;

const mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addStudent: {
      type: StudentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        approxAge: { type: GraphQLInt },
        instructorId: { type: GraphQLString }
      },
      resolve(parentValue, { id, firstName, approxAge, instructorId }) {
        return axios
          .post("http://localhost:3000/students", {
            id,
            firstName,
            approxAge,
            instructorId
          })
          .then(res => res.data);
      }
    },
    deleteStudent: {
      type: StudentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return axios
          .delete(`http://localhost:3000/students/${id}`)
          .then(res => res.data);
      }
    },
    editStudent: {
      type: StudentType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        approxAge: { type: GraphQLInt },
        instructorId: { type: GraphQLString }
      },
      resolve(parentValue, args) {
        return axios
          .patch(`http://localhost:3000/students/${args.id}`, args)
          .then(res => res.data);
      }
    },
    addInstructor: {
      type: InstructorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: new GraphQLNonNull(GraphQLString) },
        approxAge: { type: GraphQLInt }
      },
      resolve(parentValue, { id, firstName, approxAge }) {
        return axios
          .post("http://localhost:3000/instructors", {
            id,
            firstName,
            approxAge
          })
          .then(res => res.data);
      }
    },
    deleteInstructor: {
      type: InstructorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { id }) {
        return axios
          .delete(`http://localhost:3000/instructors/${id}`)
          .then(res => res.data);
      }
    },
    editInstructor: {
      type: InstructorType,
      args: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        firstName: { type: GraphQLString },
        approxAge: { type: GraphQLInt }
      },
      resolve(parentValue, args) {
        return axios
          .patch(`http://localhost:3000/instructors/${args.id}`, args)
          .then(res => res.data);
      }
    }
  }
});

module.exports = mutation;
