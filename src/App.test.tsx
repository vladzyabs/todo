import React from 'react';
import { render } from '@testing-library/react';
import AppWithState from './AppWithState';

test('renders learn react link', () => {
  const { getByText } = render(<AppWithState />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
