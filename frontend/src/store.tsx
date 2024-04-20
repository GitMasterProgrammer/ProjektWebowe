import createStore from "react-auth-kit/createStore";
interface IUserData {
    name: string;
    id: number;
}

export const store = createStore<IUserData>({
    authName:'_auth',
    authType:'cookie',
    cookieDomain: window.location.hostname,
    cookieSecure: false
});
