import {Link, useNavigate  } from "react-router-dom";
import {routes} from "../../helpers/routing.tsx";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";

export default function Navbar() {
    const auth  = useAuthUser()
    const signOut = useSignOut()
    const navigate = useNavigate ();
    const handleSignOut = () => {
        signOut();
        navigate('/')
    };
    return (
        <nav>
            <ul className="navbar-nav">
                {routes.filter(route=> !route.hidden).map((route) => (
                    <li className={"nav-item"} key={route.path}>
                        <Link className="nav-link" to={route.path}>{route.label}</Link>
                    </li>
                ))}
                {auth ? (
                    <li className="nav-item">
                        <span>{auth.email}</span>
                        <button onClick={handleSignOut}>Sign Out</button>
                    </li>
                )
                :
                    (<li className="nav-item" key={'login'}>
                        <Link className="nav-link" to={"/login"}>Login</Link>
                    </li>)

                }
            </ul>
        </nav>
    )
}