import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";
import wait from "waait";
import { gql } from "apollo-boost";
import UpdateForm from "./UpdateForm";
import { act } from "react-dom/test-utils";

let container: HTMLDivElement | null = null;
beforeEach(() => {
  // setup DOM element as render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container as Element);
  if (container) {
    container.remove();
    container = null;
  }
});

const GET_CHARACTER_QUERY = gql`
  {
    character(id: 2) {
      id
      name
      status
      species
    }
  }
`;

describe("UpdateForm component", () => {
  it("fetches data", async () => {
    const mocks = [
      {
        request: {
          query: GET_CHARACTER_QUERY
        },
        result: {
          data: {
            character: {
              id: "2",
              name: "Simon Rycroft",
              status: "Alive - Barely",
              species: "Human"
            }
          }
        }
      }
    ];

    // Render the form wrapped in a mock Apollo provider. This replaces real calls to the
    // external API with mocks we control.
    // addTypeName - omitting this causes TS warnings and the mock to not return expected data
    const { getByLabelText } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <UpdateForm id="2" />
      </MockedProvider>
    );

    // wait for GraphQL query to return data
    await act(async () => {
      await wait(0);
    });

    // now data has returned and form has rendered we can query the DOM
    const name: HTMLElement = getByLabelText("Name");
    expect(name.value).toEqual("Simon Rycroft");
  });
});
