import Heading from "../../components/Heading";
import TargetView from "../../components/TargetView";

export default function Targets() {
    return (
        <div className="container">
            <Heading content={"Osoby utworzone przez użytkownikow:"}/>
            <p>Nie ma osoby, którą chcesz polobi, <a href={'/createTarget'}>utwórz ją!</a></p>
            <TargetView />
        </div>
    )
}