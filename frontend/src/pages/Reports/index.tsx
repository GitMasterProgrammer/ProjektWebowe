import Heading from "../../components/Heading";
import ReportView from "../../components/ReportView";

export default function Reports() {
    return (
        <div className="container">
            <Heading content={"Zgłoszone zgłoszenia:"}/>
            <p>Nie ma zgłoszenia, <a href={'/report'}>utwórz je!</a></p>
            <ReportView />
        </div>
    )
}