import { act, render, screen, waitFor, fireEvent } from '@testing-library/react';
import TargetView from '../../TargetView';
import fetchMock from 'jest-fetch-mock';
import AuthProvider from 'react-auth-kit';
import { store } from '../../../store';
import "@testing-library/jest-dom";

fetchMock.enableMocks();
const mockFetch = jest.fn();
window.fetch = mockFetch;
jest.mock('react-auth-kit/hooks/useAuthUser', () => ({
    __esModule: true,
    default: jest.fn(() => ({ id: 'user123' })),
}));

describe('TargetView', () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test('renders targets correctly', async () => {
        mockFetch.mockResolvedValue({
            json: async () => ({
                "recordsLike": [
                    {
                        id: 1,
                        name: "moaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        description: "sdds",
                        creatorId: 1,
                        creator: {
                            id: 1,
                            createdAt: "2024-05-08T14:27:08.000Z",
                            email: "dsds@gmail.com",
                            name: "moaaaaaaaaaaaaaaaaaaaaaaaaaa",
                            password: "nigg",
                            reliability: 5
                        },
                        "users": [
                            {
                                userId: 4,
                                targetId: 1,
                                likedAt: "2024-05-30T08:27:50.505Z"
                            }
                        ],
                        "likes": 1
                    }
                ]
            }),
            ok: true,
        });

        await act(async () => {
            render(
                <AuthProvider store={store}>
                    <TargetView />
                </AuthProvider>
            );
        });

        await waitFor(() => {
            expect(screen.getByText('sdds')).toBeInTheDocument();
        });
    });

    test('filters targets by name', async () => {
        const mockTargets = [
            {
                id: 1,
                name: "Target 1",
                description: "Description 1",
                creatorId: 1,
                creator: {
                    id: 1,
                    name: "User 1",
                },
                users: [],
                likes: 10,
            },
            {
                id: 2,
                name: "Target 2",
                description: "Description 2",
                creatorId: 2,
                creator: {
                    id: 2,
                    name: "User 2",
                },
                users: [],
                likes: 20,
            },
        ];

        mockFetch.mockResolvedValue({
            json: async () => ({
                recordsLike: mockTargets,
                record: {
                        id: 1,
                        createdAt: "2024-05-08T14:27:08.000Z",
                        email: "dsds@gmail.com",
                        name: "moaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        password: "nigg",
                        reliability: 5,
                        favourites: [
                            {
                                userId: 1,
                                targetId: 2,
                                likedAt: "2024-05-22T21:21:08.000Z",
                                target: {
                                    id: 2,
                                    name: "twojadsds",
                                    description: "sddsds",
                                    creatorId: 1
                                }
                            }
                        ]
                }
            }),
            ok: true,
        });

        await act(async () => {
            render(
                <AuthProvider store={store}>
                    <TargetView />
                </AuthProvider>
            );
        });

        const searchInput = screen.getByPlaceholderText('Szukaj...');
        fireEvent.change(searchInput, { target: { value: 'Target 1' } });
        fireEvent.click(screen.getByText('Szukaj'));

        await waitFor(() => {
            expect(screen.getByText('Target 1')).toBeInTheDocument();
        });
    });
});
