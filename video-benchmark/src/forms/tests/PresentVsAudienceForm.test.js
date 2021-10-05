import React from "react";
import { render } from '@testing-library/react';
import PresentVsAudienceForm from '../PresentVsAudienceForm';

it("renders without crashing", function() {
  render(<PresentVsAudienceForm />);
});

it("matches snapshot", function() {
  const { asFragment } = render(<PresentVsAudienceForm />);
  expect(asFragment()).toMatchSnapshot();
});