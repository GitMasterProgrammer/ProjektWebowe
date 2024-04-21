import Heading from "../../components/Heading";
import TargetForm from "../../components/TargetForm";

export default function CreateTarget(){
    return(
        <div className={"container"}>
            <Heading level={1} content={"Utwórz profil osoby do śledzenia"} />
            <TargetForm />
        </div>
    )
}