import { useClickAway } from "react-use";
import { useRef } from "react";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import {routes} from "../../helpers/routing.tsx";
import {Link, useNavigate} from "react-router-dom";
import useAuthUser from "react-auth-kit/hooks/useAuthUser";
import useSignOut from "react-auth-kit/hooks/useSignOut";


export default function  NavbarMobile() {
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);
    const auth = useAuthUser() as {email:string};
    const signOut = useSignOut();
    const navigate = useNavigate();
    const handleSignOut = () => {
        signOut();
        navigate('/');
    };
    useClickAway(ref, () => setOpen(false));

    return (
        <div ref={ref} className="navbar-mobile">
            <Hamburger toggled={isOpen} size={20} toggle={setOpen} />
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="navbar-content"
                    >
                        <ul className="navbar-nav navbar-nav-bottom mr-auto">
                            {routes.filter(route => !route.hidden).map((route, idx) => {

                                return (
                                    <motion.li
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            type: "spring",
                                            stiffness: 260,
                                            damping: 20,
                                            delay: 0.1 + idx / 10,
                                        }}
                                        key={route.label}
                                        className="nav-item"
                                    >
                                        {/*<a*/}
                                        {/*    */}
                                        {/*    className={*/}
                                        {/*        "flex items-center justify-between w-full p-5 rounded-xl bg-neutral-950"*/}
                                        {/*    }*/}
                                        {/*    href={route.path}*/}
                                        {/*>*/}
                                        {/*    <span className="flex gap-1 text-lg">{route.label}</span>*/}
                                        {/*</a>*/}
                                        <Link onClick={() => setOpen((prev) => !prev)} className="nav-link" to={route.path}>{route.label}</Link>

                                    </motion.li>
                                );
                            })}
                        </ul>
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
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}