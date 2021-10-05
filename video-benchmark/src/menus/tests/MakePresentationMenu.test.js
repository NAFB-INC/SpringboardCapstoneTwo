import React from "react";
import { render } from '@testing-library/react';
import MakePresentationMenu from '../MakePresentationMenu';
import UserContext from "../../hooks/UserContext";

let baseURL = "hi";
const testCase1 = (
  <div>
      <UserContext.Provider value={{ baseURL }}>
          <MakePresentationMenu />
      </UserContext.Provider>
  </div>);


it("renders without crashing", function() {
  render(testCase1);
});

it("matches snapshot", function() {
  const { asFragment } = render(testCase1);
  expect(asFragment()).toMatchSnapshot();
});