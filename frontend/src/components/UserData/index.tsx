

interface UserDataProps {
    userId: number
}
export default function UserData({userId} : UserDataProps) {
    const user_data = {
        userId: 1,
        createdAt: new Date(),
        email: "wp.p2@f",
        name: "Cebula",
        reliability: 12.4
    }

    if (userId == null && user_data.userId == null) {
        return (
            <p>Please login to see your data</p>
        )
    }
    else {
        return (
            <ul>
                <li>Username: {user_data.name}</li>
                <li>Email: {user_data.email}</li>
                <li>Created at: {user_data.createdAt.toString()}</li>
                <li>Reliability: {user_data.reliability}</li>
            </ul>
        )
    }

}