import Heading from "../../components/Heading";
import LinkButton from "../../components/LinkButton";

export default function Home(){
    return(
        <div className={"container-normal"}>
            <div className={'box-round-container'}>
                <Heading level={1} content={"Witaj na stronie PyssTektor"} className="title-main margin-bottom"/>
                <div className="main-description sec-font margin-bottom">
                    Utwórz konto już dziś zdobywaj zaufanie ludzi i zostań najlepszym PyssTektorem!!!
                </div>
                <LinkButton href={'/register'} content={'Rozpocznij zgłaszanie'} className="btn btn-primary btn-normal color-white" />
            </div>
        </div>
    )
}
