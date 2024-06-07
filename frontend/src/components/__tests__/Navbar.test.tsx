import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import  AuthProvider  from 'react-auth-kit';
import { store } from '../../store';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import useSignOut from 'react-auth-kit/hooks/useSignOut';

// Mock the hooks
jest.mock('react-auth-kit/hooks/useAuthUser');
jest.mock('react-auth-kit/hooks/useSignOut');
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));

const mockedUseAuthUser = useAuthUser as jest.Mock;
const mockedUseSignOut = useSignOut as jest.Mock;
const mockedUseNavigate = useNavigate as jest.Mock;

describe('Navbar', () => {
    beforeEach(() => {
        mockedUseAuthUser.mockClear();
        mockedUseSignOut.mockClear();
        mockedUseNavigate.mockClear();
    });

    it('should render without crashing', () => {
        const { container } = render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthProvider>
        );
        expect(container).toBeInTheDocument();
    });

    it('should display login and register links when not authenticated', () => {
        mockedUseAuthUser.mockReturnValue(null);

        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthProvider>
        );

        expect(screen.getByText('Zaloguj się')).toBeInTheDocument();
        expect(screen.getByText('Zarejestruj się')).toBeInTheDocument();
    });

    it('should display user email and logout button when authenticated', () => {
        const mockUser = { email: 'test@example.com' };
        mockedUseAuthUser.mockReturnValue(mockUser);

        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthProvider>
        );

        expect(screen.getByText(mockUser.email)).toBeInTheDocument();
        expect(screen.getByText('Wyloguj się')).toBeInTheDocument();
    });

    it('should call signOut and navigate to home on logout', () => {
        const mockUser = { email: 'test@example.com' };
        mockedUseAuthUser.mockReturnValue(mockUser);
        const mockSignOut = jest.fn();
        mockedUseSignOut.mockReturnValue(mockSignOut);
        const mockNavigate = jest.fn();
        mockedUseNavigate.mockReturnValue(mockNavigate);

        render(
            <AuthProvider store={store}>
                <MemoryRouter>
                    <Navbar />
                </MemoryRouter>
            </AuthProvider>
        );

        const logoutButton = screen.getByText('Wyloguj się');
        fireEvent.click(logoutButton);

        expect(mockSignOut).toHaveBeenCalled();
        expect(mockNavigate).toHaveBeenCalledWith('/');
    });
});
