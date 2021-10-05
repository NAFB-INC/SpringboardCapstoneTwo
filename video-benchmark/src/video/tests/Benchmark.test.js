import React from "react";
import { render } from '@testing-library/react';
import Benchmark from '../Benchmark';

it("renders without crashing", function() {
  render(<Benchmark />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Benchmark />);
  expect(asFragment()).toMatchSnapshot();
});