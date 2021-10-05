import React from "react";
import { render } from '@testing-library/react';
import Home from '../Home';
import UserContext from "../../hooks/UserContext";

let pvA = "audience";
const testCase1 = (
<div>
    <UserContext.Provider value={{ pvA }}>
        <Home />
    </UserContext.Provider>
</div>);

pvA = "presenter";
const testCase2 = (
<div>
    <UserContext.Provider value={{ pvA }}>
        <Home />
    </UserContext.Provider>
</div>);

it("renders without crashing", function() {
  render(testCase1);
});

it("renders without crashing", function() {
    render(testCase2);
  });

it("matches snapshot", function() {
  const { asFragment } = render(testCase1);
  expect(asFragment()).toMatchSnapshot();
});