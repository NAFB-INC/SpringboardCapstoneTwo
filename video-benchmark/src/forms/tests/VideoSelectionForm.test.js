import React from "react";
import { render } from '@testing-library/react';
import VideoSelectionForm from '../VideoSelectionForm';

it("renders without crashing", function() {
  render(<VideoSelectionForm />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<VideoSelectionForm />);
  expect(asFragment()).toMatchSnapshot();
});