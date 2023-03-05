import { render, screen } from '@testing-library/react';
import Weather from './';

test('renders weather widget', () => {
  render(<Weather title="test title" description="test description" />);
  const title = screen.getByText(/test title/i);
  const description = screen.getByText(/test description/i);
  expect(title).toBeInTheDocument();
  expect(description).toBeInTheDocument();
});

