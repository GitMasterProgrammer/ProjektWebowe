import { render, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import Navbar from '../Navbar';
import '@testing-library/jest-dom';
import { createMemoryHistory } from 'history';


jest.mock('react-auth-kit/hooks/useAuthUser', () => jest.fn());
jest.mock('react-auth-kit/hooks/useSignOut', () => jest.fn());

describe('Navbar', () => {
  it('should render without crashing', () => {
    const { container } = render(<Navbar />, { wrapper: MemoryRouter });
    expect(container).toBeTruthy();
  });

  it('should render the correct links when not authenticated', () => {
    const useAuthUserMock = require('react-auth-kit/hooks/useAuthUser');
    useAuthUserMock.mockReturnValue(null);

    const { getByText } = render(<Navbar />);
    expect(getByText('Zaloguj się')).toBeInTheDocument();
    expect(getByText('Zarejestruj się')).toBeInTheDocument();
  });

  it('should render the correct links when authenticated', () => {
    const useAuthUserMock = require('react-auth-kit/hooks/useAuthUser');
    useAuthUserMock.mockReturnValue({ email: 'test@example.com' });

    const { getByText } = render(<Navbar />);
    expect(getByText('test@example.com')).toBeInTheDocument();
    expect(getByText('Wyloguj się')).toBeInTheDocument();
  });

  it('should call signOut and navigate to home page when sign out button is clicked', () => {
    const useAuthUserMock = require('react-auth-kit/hooks/useAuthUser');
    useAuthUserMock.mockReturnValue({ email: 'test@example.com' });

    const useSignOutMock = require('react-auth-kit/hooks/useSignOut');
    const signOutMock = jest.fn();
    useSignOutMock.mockReturnValue(signOutMock);

    const history = createMemoryHistory();
    const { getByText } = render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );

    fireEvent.click(getByText('Wyloguj się'));
    expect(signOutMock).toHaveBeenCalled();
    expect(history.location.pathname).toBe('/');
  });
});
