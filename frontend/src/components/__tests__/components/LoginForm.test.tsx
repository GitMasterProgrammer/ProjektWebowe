import {render, fireEvent, waitFor} from '@testing-library/react';
import axios from 'axios';
import LoginForm from '../../LoginForm';
import useSignIn from 'react-auth-kit/hooks/useSignIn';
import { hashSync } from 'bcryptjs';
import validateEmail from '../../../helpers/validateEmail';
import '@testing-library/jest-dom';
import {validatePassword} from "../../../helpers/validatePassword.tsx";

//import {validatePassword} from "../../helpers/validatePassword.tsx";
const mockedUseSignIn = useSignIn as jest.Mock;
const mockedAxiosPost = axios.post as jest.Mock;
const mockedValidateEmail = validateEmail as jest.Mock;
//const mockedValidatePassword = validatePassword as jest.Mock;
const mockedValidatePassword = validatePassword as jest.Mock;

jest.mock('axios');
jest.mock('react-auth-kit/hooks/useSignIn');
jest.mock('../../../helpers/validatePassword');

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
}));
jest.mock('../../../helpers/validateEmail');
const mockedUsedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom') as any,
    useNavigate: () => mockedUsedNavigate,
}));
describe('LoginForm', () => {
    beforeEach(() => {
        mockedUseSignIn.mockClear();
        mockedAxiosPost.mockClear();
        mockedValidateEmail.mockClear();
        mockedValidatePassword.mockClear();
        (useSignIn as jest.Mock).mockReturnValue(jest.fn());
        //(validateEmail as jest.Mock).mockReturnValue(true);
        (useSignIn as jest.Mock).mockReturnValue(jest.fn());

    });

    it('submits form with correct data', async () => {
        (validateEmail as jest.Mock).mockReturnValueOnce(true);
        (useSignIn as jest.Mock).mockReturnValueOnce(true);


        (axios.post as jest.Mock).mockResolvedValueOnce({
            data : { token : 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', id : 1 } ,
            status: 200
        });

        const { getByLabelText, getByText } = render(<LoginForm />);

        fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByLabelText('Hasło:'), { target: { value: 'password' } });

        fireEvent.click(getByText('Zaloguj się'));

        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith('http://localhost:3000/api/login', {
                email: 'test@example.com',
                password: hashSync('password', '$2a$10$CwTycUXWue0Thq9StjUM0u'),
            });
        });
    });

    it('displays error message if login fails', async () => {
        (axios.post as jest.Mock).mockRejectedValueOnce({ response: { data: { message: 'Login failed' } } });

        const { getByLabelText, getByText } = render(<LoginForm />);

        fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByLabelText('Hasło:'), { target: { value: 'password' } });

        fireEvent.click(getByText('Zaloguj się'));

        await waitFor(() => {
            expect(getByText('Email jest niepoprawny')).toBeInTheDocument();
        });
    });

    it('check if navigation change is called', async () => {
        mockedAxiosPost.mockResolvedValue({ data: { token : 'maxmaxmax', id:2 }, status : 200 });
        mockedValidateEmail.mockReturnValue(true);
        mockedValidatePassword.mockReturnValue([]);
        const mockSignIn = jest.fn().mockReturnValue(true);
        mockedUseSignIn.mockReturnValue(mockSignIn);


        const { getByLabelText, getByText } = render(<LoginForm />);


        fireEvent.change(getByLabelText('Email:'), { target: { value: 'test@example.com' } });
        fireEvent.change(getByLabelText('Hasło:'), { target: { value: 'Password123##$$' } });

        fireEvent.click(getByText('Zaloguj się'));

        await waitFor(() => {
            expect(mockedUsedNavigate).toHaveBeenCalledWith(-1);

        });
    });
});
