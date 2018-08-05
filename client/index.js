import React from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-client";
import { ApolloProvider } from "react-apollo";
import StudentList from "./components/studentList";

const client = new ApolloClient({});

const Root = () => {
  return (
    <ApolloProvider client={client}>
      <div>Fullstack and GraceHopper 1806!</div>
      <StudentList />
    </ApolloProvider>
  );
};

ReactDOM.render(<Root />, document.querySelector("#root"));
