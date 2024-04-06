import Heading from "../../components/Heading";
import LinkButton from "../../components/LinkButton";

export default function Home(){
    return(
        <div className={"container"}>
            <Heading level={1} content={"Witaj na stronie PyssTektor (czy tam coś innego)"} />
            <p>
                Możesz tutaj zgłaszać lub sprawdzać lokalizacje osób.
                Utwórz konto już dziś, zdobwaj zaufanie ludzi i zostań najlepszym PyssTektorem!!! 🔥 🔥 🔥
            </p>
            <LinkButton href={'/register'} content={'Rozpocznij zgłaszanie'} />
        </div>
    )
}
