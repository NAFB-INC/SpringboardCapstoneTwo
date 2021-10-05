import React from "react";
import { render } from '@testing-library/react';
import Video from '../Video';

it("renders without crashing", function() {
  render(<Video />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<Video />);
  expect(asFragment()).toMatchSnapshot();
});