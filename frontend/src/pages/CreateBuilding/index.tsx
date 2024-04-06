import Heading from "../../components/Heading";
import {BuildingForm} from "../../components/BuildingForm";

export default function CreateBuilding(){
    return(
        <div className={"container"}>
            <Heading level={1} content={"Dodaj budynek"} />
            <p>Możesz go potem wykożystać, aby szybciej utworzyć zgłoszenie!</p>
            <BuildingForm />
        </div>
    )
}