import React from "react";
import { render } from '@testing-library/react';
import Question from '../Question';

it("renders without crashing", function() {
  render(<Question />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Question />);
  expect(asFragment()).toMatchSnapshot();
});