import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ActualityButton from '../ActualityButton';
import fetchMock from "jest-fetch-mock";

fetchMock.enableMocks();
jest.mock('react-auth-kit/hooks/useAuthUser');

beforeEach(() => {
    fetchMock.resetMocks();
});
  
describe('ActualityButton', () => {

    it('renders correctly when isActive is true', () => {
        const { getByText } = render(<ActualityButton reportId={1} isActive={true} />);
        expect(getByText('Ustaw jako nieaktywne')).toBeInTheDocument();
    });

    it('renders correctly when isActive is false', () => {
        const { getByText } = render(<ActualityButton reportId={1} isActive={false} />);
        expect(getByText('Ustaw jako aktywne')).toBeInTheDocument();
    });

    it('calls fetch with correct parameters when isActive is true and button is clicked', () => {
        fetchMock.mockResponseOnce(JSON.stringify({actual: false}));

        const { getByText } = render(<ActualityButton reportId={1} isActive={true} />);
        fireEvent.click(getByText('Ustaw jako nieaktywne'));

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/location/put/1', expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({ actual: false }),
        }));
    });

    it('calls fetch with correct parameters when isActive is false and button is clicked', () => {
        fetchMock.mockResponseOnce(JSON.stringify({ actual: true }));
        const { getByText } = render(<ActualityButton reportId={1} isActive={false} />);
        fireEvent.click(getByText('Ustaw jako aktywne'));

        expect(fetch).toHaveBeenCalledTimes(1);
        expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/location/put/1', expect.objectContaining({
            method: 'PUT',
            body: JSON.stringify({ actual: true }),
        }));
    });

    it('handles fetch error when isActive is true and button is clicked', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('API is down'));

        console.error = jest.fn(); 

        const { getByText } = render(<ActualityButton reportId={1} isActive={true} />);
        fireEvent.click(getByText('Ustaw jako nieaktywne'));

        expect(console.error);
    });

    it('handles fetch error when isActive is false and button is clicked', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() => Promise.reject('API is down'));

        console.error = jest.fn(); 

        const { getByText } = render(<ActualityButton reportId={1} isActive={false} />);
        fireEvent.click(getByText('Ustaw jako aktywne'));

        expect(console.error);
    });
});
