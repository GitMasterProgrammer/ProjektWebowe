/*import FindTarget from '../FindTarget';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

global.fetch = jest.fn();

describe('FindTarget component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders correctly', () => {
    const setValue = jest.fn();
    const { getByPlaceholderText } = render(<FindTarget setValue={setValue} />);
    expect(getByPlaceholderText('Nazwa osoby')).toBeInTheDocument();
  });

  it('calls setValue when selecting a target', async () => {
    const setValue = jest.fn();
    const targets = [
      { id: 1, name: 'Target 1', likes: 10, creator: { name: 'Creator 1' } },
      { id: 2, name: 'Target 2', likes: 20, creator: { name: 'Creator 2' } },
    ];

    (global.fetch as jest.Mock).mockResolvedValueOnce({ json: () => Promise.resolve({ recordsLike: targets }),});


    const { getByPlaceholderText, getByText } = render(<FindTarget setValue={setValue} />);
    const input = getByPlaceholderText('Nazwa osoby');
    fireEvent.change(input, { target: { value: 'Target' } });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith('http://localhost:3000/api/target/get?name=Target&orderBy=likes_desc&maxRows=5', { method: 'GET' });
      expect(fetch).toHaveBeenCalledTimes(1);
    });

    const targetElement = getByText('Target 1(10) by Creator 1');
    fireEvent.click(targetElement);

    expect(setValue).toHaveBeenCalledWith(1);
  });
});
*/