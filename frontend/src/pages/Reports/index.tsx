import Heading from "../../components/Heading";
import ReportView from "../../components/ReportView";
import LinkButton from "../../components/LinkButton";

export default function Reports() {
    return (
        <div className="container-normal">
            <Heading content={"Zgłoszone zgłoszenia"} className="title-main-lighter"/>
            <p>Nie ma zgłoszenia, <LinkButton href={'/report'} content={'Utwórz je!'} className="" /></p>
            <ReportView />
        </div>
    )
}