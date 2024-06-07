

import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Heading from '../../Heading';

describe('Heading component', () => {
  it('renders an h1 tag by default', () => {
    render(<Heading content="Hello World" />);
    const headingElement = screen.getByText('Hello World');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H1');
  });

  it('renders an h2 tag when level prop is 2', () => {
    render(<Heading level={2} content="Hello World" />);
    const headingElement = screen.getByText('Hello World');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H2');
  });

  it('applies custom className to the heading', () => {
    render(
      <Heading level={3} content="Hello World" className="custom-class" />
    );
    const headingElement = screen.getByText('Hello World');
    expect(headingElement).toHaveClass('custom-class');
  });

  it('renders content correctly regardless of the level', () => {
    render(<Heading level={6} content="Hello World" />);
    const headingElement = screen.getByText('Hello World');
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName).toBe('H6');
  });
});
