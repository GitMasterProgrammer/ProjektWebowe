import Heading from "../../components/Heading";
import ReportView from "../../components/ReportView";

export default function Reports() {
    return (
        <div className="container">
            <Heading content={"Zgłoszone zgłoszenia:"}/>
            <p>Nie ma zgłoszenia, utwórz je! <a href={'/createTarget'}>utwórz ją!</a></p>
            <ReportView />
        </div>
    )
}