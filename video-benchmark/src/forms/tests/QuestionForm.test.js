import React from "react";
import { render } from '@testing-library/react';
import QuestionForm from '../QuestionForm';

it("renders without crashing", function() {
  render(<QuestionForm />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<QuestionForm />);
  expect(asFragment()).toMatchSnapshot();
});