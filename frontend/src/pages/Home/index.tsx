import Heading from "../../components/Heading";
import LinkButton from "../../components/LinkButton";

export default function Home(){
    return(
        <div className={"container"}>
            <Heading level={1} content={"Witaj na stronie PyssTektor (czy tam coś innego)"} className="title-main"/>
            <p className="main-description">
                Możesz tutaj zgłaszać lub sprawdzać lokalizacje osób.
                Utwórz konto już dziś, zdobwaj zaufanie ludzi i zostań najlepszym PyssTektorem!!! 🔥 🔥 🔥
            </p>
            <LinkButton href={'/register'} content={'Rozpocznij zgłaszanie'} className="btn btn-primary btn-normal" />
        </div>
    )
}
