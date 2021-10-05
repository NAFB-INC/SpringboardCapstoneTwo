import React from "react";
import { render } from '@testing-library/react';
import VideoBox from '../VideoBox';

it("renders without crashing", function() {
  render(<VideoBox />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<VideoBox />);
  expect(asFragment()).toMatchSnapshot();
});