import Heading from "../../components/Heading";
import LoginForm from "../../components/LoginForm";



export default function Login(){
    return(
        <div className={"container"}>
            <Heading level={1} content={"Zaloguj się"} />
            <LoginForm />
        </div>
    )
}
