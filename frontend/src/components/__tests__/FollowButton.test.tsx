import { render, fireEvent, waitFor } from '@testing-library/react';
import FollowButton from '../FollowButton';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import fetchMock from 'jest-fetch-mock';
import "@testing-library/jest-dom";

fetchMock.enableMocks();
jest.mock('react-auth-kit/hooks/useAuthUser');

const mockUseAuthUser = useAuthUser as jest.MockedFunction<typeof useAuthUser>;

beforeEach(() => {
    fetchMock.resetMocks();

    fetchMock.mockResponseOnce(JSON.stringify({ id:'123', userId: 1 }), { status: 200 });

    fetchMock.mockResponseOnce(JSON.stringify({ id:'123', userId: 1 }), { status: 200 });
});


describe('FollowButton', () => {
    it('should follow the target when button is clicked and not following', async () => {
        mockUseAuthUser.mockReturnValue({ id: '123' });

        const { getByText } = render(<FollowButton targetId={1} isFollowed={false} />);

        const button = getByText('Follow');
        fireEvent.click(button);

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/favourites/', expect.any(Object));
            expect(fetchMock.mock.calls[0][1]?.body).toBe(JSON.stringify({ targetId: 1, userId: '123' }));
            expect(button).toHaveTextContent('Unfollow');
        });
    });

    it('should unfollow the target when button is clicked and following', async () => {
        mockUseAuthUser.mockReturnValue({ id: '123' });

        const { getByText } = render(<FollowButton targetId={1} isFollowed={true} />);

        const button = getByText('Unfollow');
        fireEvent.click(button);

        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledWith('http://localhost:3000/api/favourites?targetId=1&userId=123', expect.any(Object));
            expect(button).toHaveTextContent('Follow');
        });
    });

});
