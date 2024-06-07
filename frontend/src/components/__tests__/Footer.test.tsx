import { render } from '@testing-library/react';
import Footer from '../Footer';
import "@testing-library/jest-dom";
describe('Footer', () => {
    it('should render the correct text', () => {
        const { getByText } = render(<Footer />);
        const footerElement = getByText('PYSSTEKTOR© | 2024');
        expect(footerElement).toBeInTheDocument();
    });

    it('should have the correct class name', () => {
        const { container } = render(<Footer />);
        const footerElement = container.querySelector('.footer');
        expect(footerElement).toBeInTheDocument();
    });
});
