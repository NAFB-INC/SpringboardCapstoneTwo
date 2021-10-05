import React from "react";
import { render } from '@testing-library/react';
import JoinPresentationMenu from '../JoinPresentationMenu';
import UserContext from "../../hooks/UserContext";

let stage = 1;
let setStage = function(){};
const testCase1 = (
  <div>
      <UserContext.Provider value={{ stage,setStage }}>
          <JoinPresentationMenu />
      </UserContext.Provider>
  </div>);


it("renders without crashing", function() {
  render(testCase1);
});

it("matches snapshot", function() {
  const { asFragment } = render(testCase1);
  expect(asFragment()).toMatchSnapshot();
});