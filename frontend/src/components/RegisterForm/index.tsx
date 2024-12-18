import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { hashSync } from "bcryptjs";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import validateEmail from "../../helpers/validateEmail.tsx";
import { validatePassword } from "../../helpers/validatePassword.tsx";

export default function RegisterForm() {
    const signIn = useSignIn();
    const [formData, setFormData] = useState({ name: "", password1: '', email: '', password2: '' });
    const [errors, setErrors] = useState<string[]>([]);
    const navigate = useNavigate();

    const onSubmit = (e : any) => {
        e.preventDefault();
        const passwordErrors = validatePassword(formData.password1);
        if (formData.password1 !== formData.password2) {
            passwordErrors.push("Hasła muszą być takie same");
            setErrors(passwordErrors);
        } else if (passwordErrors.length > 1) {
            setErrors(passwordErrors);
        } else if (validateEmail(formData.email)) {
            const password = hashSync(formData.password1, '$2a$10$CwTycUXWue0Thq9StjUM0u')
            const reqData = {
                name: formData.name,
                email: formData.email,
                password: password,
            };
            axios.post('http://localhost:3000/api/user/post', reqData)
                .then((res) => {

                    if (res.status === 200) {

                        axios.post('http://localhost:3000/api/login', { 'email': reqData.email, 'password': password })
                            .then((res) => {
                                if (res.status === 200) {

                                    if (signIn({
                                        auth: {
                                            token: res.data.token,
                                            type: 'Bearer',
                                        },
                                        userState: {
                                            email: reqData.email,
                                            id: res.data.id
                                        }
                                    })) {
                                        console.log(res)
                                        navigate('/profile');
                                    } else {
                                        console.log(res);
                                        setErrors([res.data?.message]);
                                    }
                                }
                            }).catch((res) => {
                            // console.log(res)
                                setErrors([res.toString()]);
                            });
                    } else {
                        // console.log(res)
                        setErrors(['Wystąpił niezydentyfikowany błąd']);
                    }
                })
                .catch((res) => {
                    console.log(res.response.data.error)
                    setErrors([res.response.data.error ?? res.error]);
                });
        } else {
            setErrors(["Email nie jest poprawny"]);
        }
    };

    return (
        <form method="post" onSubmit={onSubmit} className="needs-validation">
            <div className="form-group"> 
                <label htmlFor={'username'}>Username:</label>
                <input required onChange={(e) => setFormData({ ...formData, name: e.target.value })} type="text" name="username" className="form-control" placeholder="username" id={"username"}/>
            </div>
            <div className="form-group">
                <label htmlFor={'email'}>Email:</label>
                <input required onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="text" name="email" className="form-control" placeholder="email" id={"email"}/>
            </div>
            <div className="form-group">
                <label htmlFor={'password1'}>Podaj hasło:</label>
                <input required onChange={(e) => setFormData({ ...formData, password1: e.target.value })} type="password" name="password1" className="form-control" id={"password1"}/>
            </div>
            <div className="form-group">
                <label htmlFor={'password2'}>Powtórz hasło:</label>
                <input required onChange={(e) => setFormData({ ...formData, password2: e.target.value })} type="password" name="password2" className="form-control" id={"password2"}/>
            </div>
            <ul className="list-unstyled">{errors.map((error) => (<li key={error} className="text-danger">{error}</li>))}</ul> 
            <button type="submit" className="btn btn-primary btn-normal w-100">Utwórz konto</button>
            <p>Masz już konto? <a href={'/login'} className="btn btn-link">Zaloguj się</a></p>
        </form>
    );
}
