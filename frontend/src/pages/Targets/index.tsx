import Heading from "../../components/Heading";
import TargetView from "../../components/TargetView";

export default function Targets() {
    return (
        <div className="container">
            <Heading content={"Osoby utworzone przez użytkowników"} className="title-main-lighter"/>
            <p>Nie ma osoby, którą chcesz polubić, <a href={'/createTarget'}>utwórz ją!</a></p>
            <TargetView />
        </div>  
    )
}