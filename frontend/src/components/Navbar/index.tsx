import { Link, useNavigate } from "react-router-dom";
import { routes } from "../../helpers/routing.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";


export default function Navbar() {
    const auth = useAuthUser() as {email:string};
    
    const signOut = useSignOut();
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut();
        navigate('/');
    };

    return (
        <nav className="navbar navbar-expand-lg flex-wrap">
            <div className="logo-nav d-flex align-items-center flex-wrap">
            <Link className="navbar-brand" to="/">
                <img src="/logo.png" alt="Logo" width="55" height="55" className="d-inline-block align-top" />
            </Link>
            <ul className="navbar-nav navbar-nav-bottom mr-auto">
                    {routes.filter(route => !route.hidden).map((route) => (
                        <li className={"nav-item"} key={route.path}>
                            <Link className="nav-link" to={route.path}>{route.label}</Link>
                        </li>
                    ))}
            </ul>
            </div>
            <div className="nav-container">
                {auth ? (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <span className="nav-link">{auth.email}</span> 
                        </li>
                        <li className="nav-item no-after">
                            <button className="btn btn-outline-danger" onClick={handleSignOut}>Wyloguj się</button>
                        </li>
                    </ul>
                ) : (
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item nav-login no-after" key={'login'}>
                            <Link className="nav-link" to={"/login"}>Zaloguj się</Link>
                        </li>
                        <li className="nav-item nav-register no-after" key={'register'}>
                            <Link className="nav-link" to={"/register"}>Zarejestruj się</Link>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
}
