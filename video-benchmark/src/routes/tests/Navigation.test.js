import React from "react";
import { render } from '@testing-library/react';
import Navigation from '../Navigation';
import UserContext from "../../hooks/UserContext";

let setPvA = function(){};
const testCase1 = (
  <div>
      <UserContext.Provider value={{ setPvA }}>
          <Navigation />
      </UserContext.Provider>
  </div>);

it("renders without crashing", function() {
  render(testCase1);
});

it("matches snapshot", function() {
  const { asFragment } = render(testCase1);
  expect(asFragment()).toMatchSnapshot();
});