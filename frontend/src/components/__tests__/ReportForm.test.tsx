import { render, screen, fireEvent } from "@testing-library/react";
import ReportForm from "../ReportForm";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "react-auth-kit";
import fetchMock from "jest-fetch-mock";
import {store} from "../../store.tsx";
import "@testing-library/jest-dom";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import FindTarget from "../FindTarget";
fetchMock.enableMocks();

jest.mock("react-auth-kit/hooks/useAuthUser", () => ({
    __esModule: true,
    default: jest.fn(() => ({ id: "user123" })),
}));

jest.mock("react-router-dom", () => ({
    ...jest.requireActual("react-router-dom"),
    useNavigate: jest.fn(() => jest.fn()),
}));

/*jest.mock("../FindTarget", () => ({ setValue }: { setValue: (id: number) => void }) => (
    <select data-testid="find-target" onChange={(e) => setValue(parseInt(e.target.value))}>
        <option value={-1}>Wybierz...</option>
        <option value={1}>Target 1</option>
        <option value={2}>Target 2</option>
    </select>
));*/

describe("ReportForm", () => {
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    test("renders the form", () => {
        render(
            <AuthProvider store={store}>
                <Router>
                    <ReportForm />  
                </Router>
            </AuthProvider>
        );
        expect(screen.getByText("Osoba którą pozycję zgłaszasz:")).toBeInTheDocument();
    });

    test("validates form inputs", async () => {
        render(
            <AuthProvider store={store}>
                <Router>
                    <ReportForm />
                </Router>
            </AuthProvider>
        );

        fireEvent.submit(screen.getByRole("button", { name: /utwórz raport/i }));

        expect(await screen.findByText("Please enter a valid address")).toBeInTheDocument();
    });

    test("submits the form with valid data", async () => {
        fetchMock.mockResponseOnce(JSON.stringify({}));

        render(
            <AuthProvider store={store}>
                <Router>
                    <ReportForm />
                </Router>
            </AuthProvider>
        );

        fireEvent.change(screen.getByPlaceholderText("adres"), { target: { value: "Test Address" } });
        fireEvent.change(screen.getByTestId("find-target"), { target: { value: 1 } });
        fireEvent.change(screen.getByPlaceholderText("adres"), { target: { value: "Test Address" } });
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "Details" } });

        fireEvent.submit(screen.getByRole("button", { name: /utwórz raport/i }));

        /*await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith(
                "http://localhost:3000/api/location/post",
                expect.objectContaining({
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        coordinates: expect.any(String),
                        address: "Test Address",
                        details: "Details",
                        creator: {
                            connect: {
                                id: "user123",
                            },
                        },
                        target: {
                            connect: {
                                id: 1,
                            },
                        },
                    }),
                })
            );
        });*/
    });

    /*test("loads favourites on mount", async () => {
        const favourites = [
            { id: 1, name: "Target 1" },
            { id: 2, name: "Target 2" },
        ];
        fetchMock.mockResponseOnce(JSON.stringify({ record: { favourites: favourites.map((target) => ({ target })) } }));

        render(
            <AuthProvider store={store}>
                <Router>
                    <ReportForm />
                </Router>
            </AuthProvider>
        );

        await waitFor(() => expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/user/get/likedTargets/user123", { method: "GET" }));
        favourites.forEach((target) => {
            expect(screen.getByText(target.name)).toBeInTheDocument();
        });
    });*/
});
