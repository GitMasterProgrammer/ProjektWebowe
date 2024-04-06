

interface UserDataProps {
    userId: number
}
export default function UserData({userId} : UserDataProps) {


    if (userId == null) {
        return (
            <p>Please login to see your data</p>
        )
    }

}