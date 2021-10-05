import React from "react";
import { render } from '@testing-library/react';
import QuestionBoxPresenter from '../QuestionBoxPresenter';
import UserContext from "../../hooks/UserContext";

let questions = {};
const testCase1 = (
  <div>
      <UserContext.Provider value={{ questions }}>
          <QuestionBoxPresenter questions={questions}/>
      </UserContext.Provider>
  </div>);

it("renders without crashing", function() {
  render(testCase1);
});

it("matches snapshot", function() {
  const { asFragment } = render(testCase1);
  expect(asFragment()).toMatchSnapshot();
});