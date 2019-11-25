import React, { Fragment } from "react";
import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

interface UpdateFormProps {
  id: String;
}

const UpdateForm: React.FC<UpdateFormProps> = ({ id }) => {
  const GET_CHARACTER_QUERY = gql`
    {
      character(id: ${id}) {
        id
        name
        status
        species
      }
    }
  `;

  const { loading, error, data } = useQuery(GET_CHARACTER_QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Shit's broken: ${error.message}</p>;

  return (
    <Fragment>
      <p>ID: {data.character.id}</p>
      <label id="name-input">
        Name
        <input
          type="text"
          id="name"
          value={data.character.name}
          onChange={() => {}}
        />
      </label>
      <p>
        Status:{" "}
        <input type="text" value={data.character.status} onChange={() => {}} />
      </p>
      <p>
        Species:{" "}
        <input type="text" value={data.character.species} onChange={() => {}} />
      </p>
    </Fragment>
  );
};

export default UpdateForm;
