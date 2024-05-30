import { render, screen } from '@testing-library/react';
import LinkButton from '../LinkButton';
import '@testing-library/jest-dom';

describe('LinkButton', () => {
  it('should render without crashing', () => {
    const { container } = render(<LinkButton href="https://example.com" content="Test" />);
    expect(container).toBeTruthy();
  });

  it('should render the correct content', () => {
    render(<LinkButton href="https://example.com" content="Test" />);
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should render the correct href', () => {
    render(<LinkButton href="https://example.com" content="Test" />);
    expect(screen.getByText('Test').closest('a')).toHaveAttribute('href', 'https://example.com');
  });

  it('should render the correct className', () => {
    render(<LinkButton href="https://example.com" content="Test" className="btn btn-secondary" />);
    expect(screen.getByText('Test').closest('a')).toHaveClass('btn btn-secondary');
  });

  it('should render the icon when provided', () => {
    render(<LinkButton href="https://example.com" content="Test" icon={<span data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
