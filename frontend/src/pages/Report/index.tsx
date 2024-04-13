import Heading from "../../components/Heading";
import UserData from "../../components/UserData";
import {ReportForm} from "../../components/ReportForm";

export default function Report() {
    return (
        <div className="container">
            <Heading content={"Report location"} />
            <ReportForm userId={1}  />
        </div>
    )
}