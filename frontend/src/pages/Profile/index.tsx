import UserData from "../../components/UserData";
import Heading from "../../components/Heading";

export default function Profile() {
    return (
        <div className="container">
            <Heading content={"Profile page"} />
            <UserData userId={1}  />
        </div>
    )
}