import Heading from "../../components/Heading";
import ReportForm from "../../components/ReportForm";

export default function Report() {
    return (
        <div className="container">
            <Heading content={"Zgłoś"} className="title-main-lighter"/>
            <ReportForm />
        </div>
    )
}