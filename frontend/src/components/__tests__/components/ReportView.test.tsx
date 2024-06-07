import {render, screen, waitFor, fireEvent, act} from '@testing-library/react';
import ReportView from '../../ReportView';
import fetchMock from 'jest-fetch-mock';
import "@testing-library/jest-dom";

fetchMock.enableMocks();
const mockFetch = jest.fn();
window.fetch = mockFetch;
describe('ReportView', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('renders locations correctly', async () => {
        const mockLocations = [
            {
                id: 1,
                address: 'Address 1',
                coordinates: '51.1, 17.1',
                details: 'Details 1',
                rating: 4.5,
                actual: true,
                createdAt: '2023-06-01T00:00:00.000Z',
                target: {
                    id: 1,
                    name: 'Target 1',
                },
            },
            {
                id: 2,
                address: 'Address 2',
                coordinates: '52.2, 18.2',
                details: 'Details 2',
                rating: 3.8,
                actual: false,
                createdAt: '2023-06-02T00:00:00.000Z',
                target: {
                    id: 2,
                    name: 'Target 2',
                },
            },
        ];

        mockFetch.mockResolvedValue({
            json: async () => ({
                record: mockLocations
            }),
            ok: true,
        });

        render(<ReportView />);

        await waitFor(() => {
            expect(screen.getByText('Target 1')).toBeInTheDocument();
            expect(screen.getByText('4.50')).toBeInTheDocument();

            expect(screen.getByText('Target 2')).toBeInTheDocument();
            expect(screen.getByText('3.80')).toBeInTheDocument();
        });
    });

    test('filters locations by time', async () => {
        const mockLocations = [
            {
                id: 1,
                address: 'Address 1',
                coordinates: '51.1, 17.1',
                details: 'Details 1',
                rating: 4.5,
                actual: true,
                createdAt: '2023-06-07T22:00:00.000Z', // 2 hours ago
                target: {
                    id: 1,
                    name: 'Target 1',
                },
            },
            {
                id: 2,
                address: 'Address 2',
                coordinates: '52.2, 18.2',
                details: 'Details 2',
                rating: 3.8,
                actual: false,
                createdAt: '2023-06-06T12:00:00.000Z', // 1 day ago
                target: {
                    id: 2,
                    name: 'Target 2',
                },
            },
        ];

        mockFetch.mockResolvedValue({
            json: async () => ({
                record: mockLocations
            }),
            ok: true,
        });

        await act(async () => {
            render(

                <ReportView />

            );
        });

        fireEvent.click(screen.getByText('Pokaż filtry'));

        const timeSelect = screen.getByLabelText('Czas od zgłoszenia:');
        fireEvent.change(timeSelect, { target: { value: '4' } });
        fireEvent.click(screen.getByText('Filtruj'));

        await waitFor(() => {
            expect(screen.getByText('Target 1')).toBeInTheDocument();
        });
    });

    test('filters locations by actuality', async () => {
        const mockLocations = [
            {
                id: 1,
                address: 'Address 1',
                coordinates: '51.1, 17.1',
                details: 'Details 1',
                rating: 4.5,
                actual: true,
                createdAt: '2023-06-07T22:00:00.000Z',
                target: {
                    id: 1,
                    name: 'Target 1',
                },
            },
            {
                id: 2,
                address: 'Address 2',
                coordinates: '52.2, 18.2',
                details: 'Details 2',
                rating: 3.8,
                actual: false,
                createdAt: '2023-06-06T12:00:00.000Z',
                target: {
                    id: 2,
                    name: 'Target 2',
                },
            },
        ];

        mockFetch.mockResolvedValue({
            json: async () => ({
                record: mockLocations
            }),
            ok: true,
        });

        render(<ReportView />);

        // Show filters
        fireEvent.click(screen.getByText('Pokaż filtry'));

        // Filter by actuality
        const actualityCheckbox = screen.getByLabelText('Tylko aktualne');
        fireEvent.click(actualityCheckbox);
        fireEvent.click(screen.getByText('Filtruj'));

        await waitFor(() => {
            expect(screen.getByText('Target 1')).toBeInTheDocument();
        });
    });
});
