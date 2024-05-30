import RegisterForm from "../../components/RegisterForm";
import Heading from "../../components/Heading";

export default function Register(){
    return(
        <div className={"container"}>
            <Heading level={1} content={"Utwórz konto"} className="title-main-lighter"/>
            <RegisterForm />
        </div>
    )
}