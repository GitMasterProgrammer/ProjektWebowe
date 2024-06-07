import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import FindTarget from '../FindTarget';
import '@testing-library/jest-dom';

window.fetch = jest.fn();

describe('FindTarget Component', () => {
    const mockSetValue = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders input field', () => {
        render(<FindTarget setValue={mockSetValue} />);
        const input = screen.getByPlaceholderText('Nazwa osoby');
        expect(input).toBeInTheDocument();
    });

    test('calls fetch and updates targets on input change', async () => {
        // Mocking fetch response before the component is rendered
        window.fetch= jest.fn().mockResolvedValue({
            json: jest.fn().mockResolvedValue({
                recordsLike: [
                    { id: 1, name: 'John Doe', likes: 10, creator: { name: 'Creator1' } }
                ]
            })
        });

        render(<FindTarget setValue={mockSetValue} />);
        const input = screen.getByPlaceholderText('Nazwa osoby');

        fireEvent.change(input, { target: { value: 'J' } });
        fireEvent.change(input, { target: { value: 'o' } });
        fireEvent.change(input, { target: { value: 'Joh' } });

        await waitFor(() => {
            expect(screen.getByText(/John Doe/)).toBeInTheDocument();
        });
    });
});
