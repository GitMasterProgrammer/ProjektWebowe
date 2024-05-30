import Heading from "../../components/Heading";
import LinkButton from "../../components/LinkButton";

export default function Home(){
    return(
        <div className={"container-center"}>
            <Heading level={1} content={"Witaj na stronie PyssTektor"} className="title-main text-center margin-bottom"/>
            <p className="main-description">
                🔥 🔥 🔥 Utwórz konto już dziś, zdobywaj zaufanie ludzi i zostań najlepszym PyssTektorem!!! 🔥 🔥 🔥
            </p>
            <LinkButton href={'/register'} content={'Rozpocznij zgłaszanie'} className="btn btn-primary btn-normal" />
        </div>
    )
}
