import React, { Component } from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";

class StudentList extends Component {
  renderStudents() {
    return this.props.data.students.map(student => {
      return <li key={student.id}>{student.firstName}</li>;
    });
  }

  render() {
    if (this.props.data.loading) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h2>Student List</h2>
        <ul>{this.renderStudents()}</ul>
      </div>
    );
  }
}

const query = gql`
  {
    student {
      id
      firstName
    }
  }
`;
export default graphql(query)(StudentList); //After async call, makes data available to component through react's this.props
