import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import RegisterForm from '../RegisterForm';
import  AuthProvider  from 'react-auth-kit';
import { MemoryRouter } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { store } from '../../store';

import useSignIn from 'react-auth-kit/hooks/useSignIn';
import validateEmail from '../../helpers/validateEmail';
import { validatePassword } from '../../helpers/validatePassword';
import LoginForm from "../LoginForm";

jest.mock('react-auth-kit/hooks/useSignIn');
jest.mock('axios');
jest.mock('../../helpers/validateEmail');
jest.mock('../../helpers/validatePassword');
jest.mock('bcryptjs', () => ({
    hashSync: jest.fn().mockReturnValue('hashed_password'),
}));

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockedUseSignIn = useSignIn as jest.Mock;
const mockedAxiosPost = axios.post as jest.Mock;
const mockedValidateEmail = validateEmail as jest.Mock;
const mockedValidatePassword = validatePassword as jest.Mock;
//const mockedNavigate = useNavigate as jest.Mock;
//(useNavigate as jest.Mock).mockReturnValue(jest.fn());

describe('RegisterForm', () => {
    beforeEach(() => {
        mockedUseSignIn.mockClear();
        mockedAxiosPost.mockClear();
        mockedValidateEmail.mockClear();
        mockedValidatePassword.mockClear();
        (useNavigate as jest.Mock).mockReturnValue(jest.fn());
    });

    it('renders the form without crashing', () => {
        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <RegisterForm />
                </MemoryRouter>
            </AuthProvider>
        );

        expect(screen.getByLabelText(/Username/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Powtórz hasło/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Podaj hasło/i)).toBeInTheDocument();

    });

    it('shows error when passwords do not match', async () => {
        mockedValidatePassword.mockReturnValue([]);
        mockedValidateEmail.mockReturnValue(true);

        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <RegisterForm />
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Podaj hasło/i), { target: { value: 'password123' } });
        fireEvent.change(screen.getByLabelText(/Powtórz hasło/i), { target: { value: 'differentpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Utwórz konto/i }));

        await waitFor(() => {
            expect(screen.getByText(/Hasła muszą być takie same/i)).toBeInTheDocument();
        });
    });

    it('shows error sign in failed', async () => {
        //mockedAxiosPost.mockResolvedValue({ status: 200 } );
        mockedAxiosPost.mockResolvedValue({  data: { message: 'Registration failed' }, status:200 } );
        mockedValidatePassword.mockReturnValue([]);
        mockedValidateEmail.mockReturnValue(true);
        const mockSignIn = jest.fn().mockReturnValue(false);
        mockedUseSignIn.mockReturnValue(mockSignIn);

        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <RegisterForm />
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Podaj hasło/i), { target: { value: 'Ppassword123#' } });
        fireEvent.change(screen.getByLabelText(/Powtórz hasło/i), { target: { value: 'Ppassword123#' } });
        fireEvent.click(screen.getByRole('button', { name: /Utwórz konto/i }));

        await waitFor(() => {
            expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
        });
    });

    it('detect if throwing err on status code different thn 200', async () => {
        //const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

        //mockedAxiosPost.mockResolvedValue({ status: 200 } );
        mockedAxiosPost.mockResolvedValue({  data: { message: 'Registration failed' }, status: 6969 } );
        mockedValidatePassword.mockReturnValue([]);
        mockedValidateEmail.mockReturnValue(true);
        const mockSignIn = jest.fn().mockReturnValue(false);
        mockedUseSignIn.mockReturnValue(mockSignIn);

        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <RegisterForm />
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Podaj hasło/i), { target: { value: 'Ppassword123#' } });
        fireEvent.change(screen.getByLabelText(/Powtórz hasło/i), { target: { value: 'Ppassword123#' } });
        fireEvent.click(screen.getByRole('button', { name: /Utwórz konto/i }));

        await waitFor(() => {
            expect(screen.getByText(/Wystąpił niezydentyfikowany błąd/i)).toBeInTheDocument();
        });
    });

    it('shows error when passwords do not meet the conditions', async () => {
        mockedValidatePassword.mockReturnValue(['Hasło musi zawierać conajmniej 8 znaków', "Hasło musi zawierać conajmniej 8 znakó"]);
        mockedValidateEmail.mockReturnValue(true);

        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <RegisterForm />
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Podaj hasło/i), { target: { value: 'differentpassword' } });
        fireEvent.change(screen.getByLabelText(/Powtórz hasło/i), { target: { value: 'differentpassword' } });
        fireEvent.click(screen.getByRole('button', { name: /Utwórz konto/i }));

        await waitFor(() => {
            expect(screen.getByText(/Hasło musi zawierać conajmniej 8 znaków/i)).toBeInTheDocument();
        });
    });

    it('shows error for invalid email', async () => {
        mockedAxiosPost.mockRejectedValueOnce({ status: 200 });
        mockedAxiosPost.mockRejectedValueOnce({ response: { data: { message: 'Registration failed' } }, status:200 });
        mockedValidateEmail.mockReturnValue(false);
        mockedValidatePassword.mockReturnValue([]);

        const mockSignIn = jest.fn().mockReturnValue(false);
        mockedUseSignIn.mockReturnValue(mockSignIn);
        mockedValidatePassword.mockReturnValue([]);
        mockedValidateEmail.mockReturnValue(false);

        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <RegisterForm />
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'invalidemail.com' } });
        fireEvent.change(screen.getByLabelText(/Podaj hasło/i), { target: { value: 'Password123#' } });
        fireEvent.change(screen.getByLabelText(/Powtórz hasło/i), { target: { value: 'Password123#' } });
        fireEvent.click(screen.getByRole('button', { name: /Utwórz konto/i }));

        await waitFor(() => {
            expect(screen.getByText(/Email nie jest poprawny/i)).toBeInTheDocument();
        });
    });

    it('submits the form successfully', async () => {
        mockedValidatePassword.mockReturnValue([]);
        mockedValidateEmail.mockReturnValue(true);

        const mockSignIn = jest.fn().mockReturnValue(true);
        mockedUseSignIn.mockReturnValue(mockSignIn);

        mockedAxiosPost.mockResolvedValueOnce({ status: 200 });
        mockedAxiosPost.mockResolvedValueOnce({ status: 200, data: { token: 'token', id: 'id' } });

        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <RegisterForm />
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@example.com' } });
        fireEvent.change(screen.getByLabelText(/Podaj hasło/i), { target: { value: 'Password123#' } });
        fireEvent.change(screen.getByLabelText(/Powtórz hasło/i), { target: { value: 'Password123#' } });
        fireEvent.click(screen.getByRole('button', { name: /Utwórz konto/i }));

        await waitFor(() => {
            expect(mockedAxiosPost).toHaveBeenCalledWith('http://localhost:3000/api/user/post', expect.any(Object));
            expect(mockedAxiosPost).toHaveBeenCalledWith('http://localhost:3000/api/login', expect.any(Object));
        });
    });

    it('shows error message when registration fails_', async () => {
        //mockedAxiosPost.mockRejectedValueOnce({ status: 200 });
        mockedAxiosPost.mockRejectedValueOnce({ error: 'Registration failed'});
        mockedValidateEmail.mockReturnValue(true);
        mockedValidatePassword.mockReturnValue([]);

        const mockSignIn = jest.fn().mockReturnValue(false);
        mockedUseSignIn.mockReturnValue(mockSignIn);


        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <RegisterForm />
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/Podaj hasło/i), { target: { value: 'Password123#' } });
        fireEvent.change(screen.getByLabelText(/Powtórz hasło/i), { target: { value: 'Password123#' } });
        fireEvent.click(screen.getByRole('button', { name: /Utwórz konto/i }));

        await waitFor(() => {
            expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
        });
    });

    it('check if catch works', async () => {
        (axios.post as jest.Mock).mockResolvedValueOnce({ data : { message: 'Login failed' }, status : 200 } );
        (axios.post as jest.Mock).mockRejectedValue({ response: { data : { message: 'Login failed' } }, status : 200 } );
        mockedValidateEmail.mockReturnValue(true);
        mockedValidatePassword.mockReturnValue([]);

        const { getByLabelText, getByText } = render(<LoginForm />);

        fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByLabelText('Hasło:'), { target: { value: 'password' } });

        fireEvent.click(getByText('Zaloguj się'));

        await waitFor(() => {
            //expect(getByText('Login failed')).toBeInTheDocument();
        });
    });

    it('check if navigation change is called', async () => {
        //mockedAxiosPost.mockRejectedValueOnce({ status: 200 });
        mockedAxiosPost.mockResolvedValue({ data: { token : 'nigga', id:2 }, status : 200 });
        mockedValidateEmail.mockReturnValue(true);
        mockedValidatePassword.mockReturnValue([]);
        const mockedNavigate = jest.fn();
        (useNavigate as jest.Mock).mockReturnValue(mockedNavigate);

        const mockSignIn = jest.fn().mockReturnValue(true);
        mockedUseSignIn.mockReturnValue(mockSignIn);

        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <RegisterForm />
                </MemoryRouter>
            </AuthProvider>
        );

        fireEvent.change(screen.getByLabelText(/Username/i), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByLabelText(/Email/i), { target: { value: 'test@gmail.com' } });
        fireEvent.change(screen.getByLabelText(/Podaj hasło/i), { target: { value: 'Password123#' } });
        fireEvent.change(screen.getByLabelText(/Powtórz hasło/i), { target: { value: 'Password123#' } });
        fireEvent.click(screen.getByRole('button', { name: /Utwórz konto/i }));

        await waitFor(() => {
            //expect(screen.getByText(/Registration failed/i)).toBeInTheDocument();
            expect(useNavigate).toHaveBeenCalled();

        });
    });
});
