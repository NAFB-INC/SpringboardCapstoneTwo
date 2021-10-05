import React from "react";
import { render } from '@testing-library/react';
import CodeForm from '../CodeForm';
import UserContext from "../../hooks/UserContext";

let setStage = function(){};
const testCase1 = (
  <div>
      <UserContext.Provider value={{ setStage }}>
          <CodeForm />
      </UserContext.Provider>
  </div>);

it("renders without crashing", function() {
  render(testCase1);
});

it("matches snapshot", function() {
  const { asFragment } = render(testCase1);
  expect(asFragment()).toMatchSnapshot();
});