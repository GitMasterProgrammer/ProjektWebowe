import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { MemoryRouter, useParams } from 'react-router-dom';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import ReportDetails from '../../ReportDetails';
import "@testing-library/jest-dom";
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));
jest.mock('react-auth-kit/hooks/useAuthUser');

const mockFetch = jest.fn();
window.fetch = mockFetch;

describe('ReportDetails', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useParams as jest.Mock).mockReturnValue({ reportId: '1' });
        (useAuthUser as jest.Mock).mockReturnValue({ id: 'user1' });
    });

    test('renders report details correctly for non-creator', async () => {
        mockFetch
            .mockResolvedValueOnce({
                json: async () => ({
                    record: {
                        id: 1,
                        target: { name: 'Test Location' },
                        updatedAt: '2024-05-23T08:49:20.000Z',
                        address: '123 Test Street',
                        rating: 4.5,
                        actual: true,
                        details: 'Some details about the location',
                        creator: { id: 'user2', name: 'John Doe', reliability: '4' }
                    }
                }),
                ok: true,
            })
            .mockResolvedValueOnce({
                json: async () => ({ record: [{ value: 4 }] }),
                ok: true,
            });

        render(
            <MemoryRouter>
                <ReportDetails />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Test Location/i)).toBeInTheDocument();
            expect(screen.getByText(/Ostatnio aktualizowane: 2024-05-23 08:49:20/i)).toBeInTheDocument();
            expect(screen.getByText(/Adres: 123 Test Street/i)).toBeInTheDocument();
            expect(screen.getByText(/Średnia ocen: 4.5/i)).toBeInTheDocument();
            expect(screen.getByText(/Aktualne: Tak/i)).toBeInTheDocument();
            expect(screen.getByText(/Szczegóły: Some details about the location/i)).toBeInTheDocument();
            expect(screen.getByText(/Zgłaszający: John Doe \(4\)/i)).toBeInTheDocument();
            expect(screen.getByText(/Oceń to zgłoszenie/i)).toBeInTheDocument();
        });
    });

    test('renders report details correctly for creator', async () => {
        mockFetch
            .mockResolvedValueOnce({
                json: async () => ({
                    record: {
                        id: 1,
                        target: { name: 'Test Location' },
                        updatedAt: '2024-05-23T08:49:20.000Z',
                        address: '123 Test Street',
                        rating: 4.5,
                        actual: true,
                        details: 'Some details about the location',
                        creator: { id: 'user1', name: 'John Doe', reliability: '4' }
                    }
                }),
                ok: true,
            })
            .mockResolvedValueOnce({
                json: async () => ({ record: [{ value: 4 }] }),
                ok: true,
            });

        render(
            <MemoryRouter>
                <ReportDetails />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Test Location/i)).toBeInTheDocument();
            expect(screen.getByText(/Ostatnio aktualizowane: 2024-05-23 08:49:20/i)).toBeInTheDocument();
            expect(screen.getByText(/Adres: 123 Test Street/i)).toBeInTheDocument();
            expect(screen.getByText(/Średnia ocen: 4.5/i)).toBeInTheDocument();
            expect(screen.getByText(/Aktualne: Tak/i)).toBeInTheDocument();
            expect(screen.getByText(/Szczegóły: Some details about the location/i)).toBeInTheDocument();
            expect(screen.getByText(/Zgłaszający: John Doe \(4\)/i)).toBeInTheDocument();
        });
    });

    test('handles rating change', async () => {
        mockFetch
            .mockResolvedValueOnce({
                json: async () => ({
                    record: {
                        id: 1,
                        target: { name: 'Test Location' },
                        updatedAt: '2024-05-23T08:49:20.000Z',
                        address: '123 Test Street',
                        rating: 4.5,
                        actual: true,
                        details: 'Some details about the location',
                        creator: { id: 'user2', name: 'John Doe', reliability: '5' }
                    }
                }),
                ok: true,
            })
            .mockResolvedValueOnce({
                json: async () => ({ record: [{ value: 4 }] }),
                ok: true,
            });

        render(
            <MemoryRouter>
                <ReportDetails />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Oceń to zgłoszenie/i)).toBeInTheDocument();
        });

        const ratingInput = screen.getByRole('radio', { name: /4 Stars/i });

        fireEvent.click(ratingInput);

        await waitFor(() => {
            expect(ratingInput).toBeChecked();
        });
    });

    test('handles rating change with preavius rating', async () => {
        mockFetch
            .mockResolvedValueOnce({
                json: async () => ({
                    record: {
                        id: 1,
                        target: { name: 'Test Location' },
                        updatedAt: '2024-05-23T08:49:20.000Z',
                        address: '123 Test Street',
                        rating: 4.5,
                        actual: true,
                        details: 'Some details about the location',
                        creator: { id: 'user2', name: 'John Doe', reliability: '5' }
                    }
                }),
                ok: true,
            })
            .mockResolvedValueOnce({
                json: async () => ({ record: [{ value: 4 }] }),
                ok: true,
            });



        render(
            <MemoryRouter>
                <ReportDetails />
            </MemoryRouter>
        );

        await waitFor(() => {
            expect(screen.getByText(/Oceń to zgłoszenie/i)).toBeInTheDocument();
        });

        const ratingInput = screen.getByRole('radio', { name: /4 Stars/i });

        fireEvent.click(ratingInput);

        mockFetch
            .mockResolvedValueOnce({
                json: async () => ({
                    record: {
                        id: 1,
                        target: { name: 'Test Location' },
                        updatedAt: '2024-05-23T08:49:20.000Z',
                        address: '123 Test Street',
                        rating: 4,
                        actual: true,
                        details: 'Some details about the location',
                        creator: { id: 'user2', name: 'John Doe', reliability: '5' }
                    }
                }),
                ok: true,
            })
            .mockResolvedValueOnce({
                json: async () => ({ record: [{ value: 4 }] }),
                ok: true,
            });

        const ratingInput2 = screen.getByRole('radio', { name: /3 Stars/i });

        fireEvent.click(ratingInput2);


        await waitFor(() => {
            expect(ratingInput2).toBeChecked();
        });
    });
});
