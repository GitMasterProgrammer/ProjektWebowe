import axios from "axios";
import { useState } from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import { hashSync } from 'bcryptjs'
import { useNavigate } from "react-router-dom";
import validateEmail from "../../helpers/validateEmail.tsx";

export default function LoginForm() {
    const signIn = useSignIn();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState("");
    const navigate = useNavigate();

    const onSubmit = (e : any) => {
        e.preventDefault();
        if (!validateEmail(formData.email)) {
            navigate(-1);
            return setErrors("Email jest niepoprawny");
        }

        const reqData = {
            email: formData.email,
            password: hashSync(formData.password, '$2a$10$CwTycUXWue0Thq9StjUM0u'),
        };

        axios.post('http://localhost:3000/api/login', reqData)
            .then((res) => {
                if (res.status === 200) {
                    if (signIn({
                        auth: {
                            token: res.data.token,
                            type: 'Bearer',
                        },
                        userState: {
                            email: formData.email,
                            id: res.data.id
                        }
                    })) {
                        console.log("********************---------------")
                        navigate(-1);
                    } else {
                        setErrors(res.data.message);
                    }
                }
            }).catch((res) => {
                console.log(res);
                setErrors(res.response.data.message);
            });
    };

    return (
        <form method="post" onSubmit={onSubmit} className="needs-validation"> 
            <div className="form-group"> 
                <label htmlFor='email'>Email:</label>
                <input required onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" name="email" className="form-control" placeholder="email" id={"email"}/>
            </div>
            <div className="form-group"> 
                <label htmlFor='password'>Hasło:</label>
                <input required onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" name="password" className="form-control" placeholder="hasło" id={"password"}/>
            </div>
            <p>{errors}</p>
            <button type="submit" className="btn btn-primary btn-normal w-100">Zaloguj się</button>
            <p>Nie masz konta? <a href={'/register'} className="btn btn-link">Zarejestruj się</a></p>
        </form>
    );
}
