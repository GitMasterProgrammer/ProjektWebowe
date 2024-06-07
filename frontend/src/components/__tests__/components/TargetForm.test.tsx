import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import TargetForm from '../../TargetForm';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import "@testing-library/jest-dom";
import fetchMock from "jest-fetch-mock";

jest.mock('react-auth-kit/hooks/useAuthUser');
fetchMock.enableMocks();
const mockFetch = jest.fn();
window.fetch = mockFetch;

const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));

describe('TargetForm', () => {
    beforeEach(() => {
        (useAuthUser as jest.Mock).mockReturnValue({ id: 'user1' });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should render the form', () => {
        render(
            <Router>
                <TargetForm />
            </Router>
        );

        expect(screen.getByLabelText('Nazwa:')).toBeInTheDocument();
        expect(screen.getByLabelText('Opis:')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: 'Utwórz osobę' })).toBeInTheDocument();
    });

    it('should update form data on input change', () => {
        render(
            <Router>
                <TargetForm />
            </Router>
        );

        const nameInput = screen.getByLabelText('Nazwa:');
        const descriptionInput = screen.getByLabelText('Opis:');

        fireEvent.change(nameInput, { target: { value: 'Test Name' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });

        expect(nameInput).toHaveValue('Test Name');
        expect(descriptionInput).toHaveValue('Test Description');
    });

    it('should submit the form and navigate to /targets', async () => {
        mockFetch.mockResolvedValue({
            json: async () => ({
                ok: true
            }),
            ok: true,
        });


        render(
            <Router>
                <TargetForm />
            </Router>
        );

        const nameInput = screen.getByLabelText('Nazwa:');
        const descriptionInput = screen.getByLabelText('Opis:');
        const submitButton = screen.getByRole('button', { name: 'Utwórz osobę' });

        fireEvent.change(nameInput, { target: { value: 'Test Name' } });
        fireEvent.change(descriptionInput, { target: { value: 'Test Description' } });
        fireEvent.click(submitButton);

        await waitFor(() => expect(mockedUsedNavigate).toHaveBeenCalledWith('/targets'));
    });
});
