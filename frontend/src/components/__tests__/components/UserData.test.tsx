import { render, screen, waitFor } from '@testing-library/react';
import UserData from '../../UserData';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';

fetchMock.enableMocks();

jest.mock('../../../helpers/fixDate.tsx', () => ({
    fixData: (date: string) => `Fixed: ${date}`,
}));

describe('UserData', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('renders user data correctly', async () => {
        const mockUserData = {
            user: {
                name: 'John Doe',
                email: 'john.doe@example.com',
                createdAt: '2024-01-01T00:00:00.000Z',
                reliability: 5,
            },
        };

        fetchMock.mockResponseOnce(JSON.stringify(mockUserData));

        render(<UserData userId={1} />);

        await waitFor(() => {
            expect(screen.getByText('Nazwa użytkownika: John Doe')).toBeInTheDocument();
            expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
            expect(screen.getByText('Utworzone: Fixed: 2024-01-01T00:00:00.000Z')).toBeInTheDocument();
            expect(screen.getByText('Zaufanie: 5')).toBeInTheDocument();
        });
    });

    test('renders "brak" when user data is null', async () => {
        fetchMock.mockResponseOnce(JSON.stringify({ user: null }));

        render(<UserData userId={1} />);

        await waitFor(() => {
            expect(screen.getByText('brak')).toBeInTheDocument();
        });
    });

    test('handles fetch error', async () => {
        fetchMock.mockRejectOnce(new Error('Failed to fetch'));

        render(<UserData userId={1} />);

        await waitFor(() => {
            expect(screen.getByText('brak')).toBeInTheDocument();
        });
    });
});
