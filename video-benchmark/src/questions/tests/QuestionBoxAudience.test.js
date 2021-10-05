import React from "react";
import { render } from '@testing-library/react';
import QuestionBoxAudience from '../QuestionBoxAudience';
import UserContext from "../../hooks/UserContext";

let questions = {};
const testCase1 = (
<div>
    <UserContext.Provider value={{ questions }}>
        <QuestionBoxAudience />
    </UserContext.Provider>
</div>);

it("renders without crashing", function() {
  render(testCase1);
});

it("matches snapshot", function() {
  const { asFragment } = render(testCase1);
  expect(asFragment()).toMatchSnapshot();
});