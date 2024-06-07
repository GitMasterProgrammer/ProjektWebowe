import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import ReportForm from "../../ReportForm";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import fetchMock from "jest-fetch-mock";
import { store } from "../../../store.tsx";
import "@testing-library/jest-dom";
import { act } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

fetchMock.enableMocks();
const mockFetch = jest.fn();
window.fetch = mockFetch;

jest.mock("react-auth-kit/hooks/useAuthUser", () => ({
    __esModule: true,
    default: jest.fn(() => ({ id: "user123" })),
}));

describe("ReportForm", () => {
    afterEach(() => {
        fetchMock.resetMocks();
    });

    test("renders the form", async () => {
        mockFetch.mockResolvedValue({
            json: async () => ({
                record: {
                    id: 1,
                    createdAt: "2024-05-08T14:27:08.000Z",
                    email: "dsds@gmail.com",
                    name: "moaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    password: "maxmaxmax",
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
                                creatorId: 1,
                            },
                        },
                    ],
                },
            }),
            ok: true,
        });

        await act(async () => {
            render(
                <AuthProvider store={store}>
                    <Router>
                        <ReportForm />
                    </Router>
                </AuthProvider>
            );
        });
        expect(screen.getByText("Osoba którą pozycję zgłaszasz:")).toBeInTheDocument();
    });

    test("load favourites function check", async () => {
        mockFetch.mockResolvedValue({
            json: async () => ({
                record: {
                    id: 1,
                    createdAt: "2024-05-08T14:27:08.000Z",
                    email: "dsds@gmail.com",
                    name: "moaaaaaaaaaaaaaaaaaaaaaaaaaa",
                    password: "maxmaxmax",
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
                                creatorId: 1,
                            },
                        },
                    ],
                },
            }),
            ok: true,
        });

        const mockGeolocation = {
            getCurrentPosition: jest.fn().mockImplementationOnce((success) =>
                success({
                    coords: {
                        latitude: 51.1,
                        longitude: 45.3,
                    },
                })
            ),
        };

        Object.defineProperty(global.navigator, "geolocation", {
            value: mockGeolocation,
            writable: true,
        });

        await act(async () => {
            render(
                <AuthProvider store={store}>
                    <Router>
                        <ReportForm />
                    </Router>
                </AuthProvider>
            );
        });

        await waitFor(() => {
            expect(screen.getByText("twojadsds")).toBeInTheDocument();
        });
    });

    test("submits the form successfully", async () => {
        mockFetch
            .mockResolvedValueOnce({
                json: async () => ({
                    record: {
                        id: 1,
                        createdAt: "2024-05-08T14:27:08.000Z",
                        email: "dsds@gmail.com",
                        name: "moaaaaaaaaaaaaaaaaaaaaaaaaaa",
                        password: "maxmaxmax",
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
                                    creatorId: 1,
                                },
                            },
                        ],
                    },
                }),
                ok: true,
            })
            .mockResolvedValueOnce({
                json: async () => ({
                    ok: true,
                }),
            });

        fetchMock.mockResponseOnce(JSON.stringify({ ok: true }), { status: 200 });

        await act(async () => {
            render(
                <AuthProvider store={store}>
                    <Router>
                        <ReportForm />
                    </Router>
                </AuthProvider>
            );
        });

        const selectElement = screen.getByTestId("select-fav");

        fireEvent.change(selectElement, { target: { value: "2" } });

        fireEvent.change(screen.getByPlaceholderText("adres"), { target: { value: "Some address" } });
        fireEvent.change(screen.getByLabelText("Szczegóły:"), { target: { value: "Some details" } });

        fireEvent.click(screen.getByText("Utwórz raport"));
        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledWith('/reports');
        });
    });
});
