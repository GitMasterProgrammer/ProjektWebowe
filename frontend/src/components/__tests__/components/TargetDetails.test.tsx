import { render, waitFor, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useParams } from 'react-router-dom';
import TargetDetails from '../../TargetDetails';

jest.mock('react-router-dom', () => ({
    useParams: jest.fn()
}));

window.fetch = jest.fn();

describe('TargetDetails Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('displays "Ten obiekt nie istnieje" when target data is null', async () => {
        (useParams as jest.Mock).mockReturnValue({ targetId: '1' });
        (window.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({ target: null })
        });

        render(<TargetDetails />);

        await waitFor(() => expect(screen.getByText('Ten obiekt nie istnieje')).toBeInTheDocument());
    });

    test('fetches and displays target data correctly', async () => {
        (useParams as jest.Mock).mockReturnValue({ targetId: '1' });

        const mockTarget = {
            name: 'John Doe',
            description: 'A sample description',
            creator: { name: 'Creator1' },
            countLikedUsers: 10
        };

        (window.fetch as jest.Mock).mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({ target: mockTarget })
        });

        render(<TargetDetails />);

        await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(window.fetch).toHaveBeenCalledWith('http://localhost:3000/api/target/get/1', { method: 'GET' }));

        expect(screen.getByText('Nazwa: John Doe')).toBeInTheDocument();
        expect(screen.getByText('Opis: A sample description')).toBeInTheDocument();
        expect(screen.getByText('Twórca: Creator1')).toBeInTheDocument();
        expect(screen.getByText('Polubienia: 10')).toBeInTheDocument();
    });

    test('handles fetch error gracefully', async () => {
        (useParams as jest.Mock).mockReturnValue({ targetId: '1' });

        (window.fetch as jest.Mock).mockRejectedValueOnce(new Error('Failed to fetch'));

        render(<TargetDetails />);

        await waitFor(() => expect(window.fetch).toHaveBeenCalledTimes(1));

        // You can also check for error messages in console if necessary
    });
});
