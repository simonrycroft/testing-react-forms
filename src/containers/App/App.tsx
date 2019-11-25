import React, { useState } from "react";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import "./App.css";
import UpdateForm from "../forms/UpdateForm";

const client = new ApolloClient({
  uri: "https://rickandmortyapi.com/graphql"
});

const App: React.FC = () => {
  const [idState, updateIdState] = useState();
  let form;
  if (!idState) {
    form = <p>Please enter an ID</p>;
  } else {
    form = <UpdateForm id={idState} />;
  }
  return (
    <ApolloProvider client={client}>
      <div className="App">
        Character ID:
        <input
          type="text"
          onChange={event => updateIdState(event.target.value)}
        />
        {form}
      </div>
    </ApolloProvider>
  );
};

export default App;
