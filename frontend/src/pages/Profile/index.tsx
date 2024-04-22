import UserData from "../../components/UserData";
import Heading from "../../components/Heading";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";

export default function Profile() {
    const auth  = useAuthUser()
    return (
        <div className="container">
            <Heading content={"Profile page"} />
            <UserData userId={auth.id}  />
        </div>
    )
}