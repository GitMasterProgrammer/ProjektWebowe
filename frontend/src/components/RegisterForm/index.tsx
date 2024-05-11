import React from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import bcrypt from "bcryptjs";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import validateEmail from "../../helpers/validateEmail.tsx";
import {validatePassword} from "../../helpers/validatePassword.tsx";


export default function RegisterForm(){
    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({name: "", password1: '',email: '', password2: ''})
    const [errors, setErrors] = React.useState<string[]>([])
    const navigate = useNavigate ();
    const OnSubmit = (e) =>{
        e.preventDefault()
        const passwordErrors = validatePassword(formData.password1);
        if (formData.password1 !== formData.password2){
            passwordErrors.push("Hasłą muszą być takie same");
            setErrors(passwordErrors)
        } else if (passwordErrors.length > 1) {
            setErrors(passwordErrors)
        } else if (validateEmail(formData.email)) {
            const reqData = {
                name: formData.name,
                email: formData.email,
                password: bcrypt.hashSync(formData.password1, '$2a$10$CwTycUXWue0Thq9StjUM0u'),
            }
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(reqData)
            };
            fetch('http://localhost:3000/api/user/post', requestOptions)
                .then(response => {
                    return response.json()

                }
                    )
                .then(data => {
                    console.log(data)
                    if (data.status == "success") {
                        axios.post('http://localhost:3000/api/login', {'email': reqData.email, 'password': reqData.password})
                            .then((res)=>{
                                if(res.status === 200){
                                    if(signIn({
                                        auth: {
                                            token: res.data.token,
                                            type: 'Bearer',
                                        },
                                        userState: {
                                            email: formData.email,
                                            id: res.data.id
                                        }
                                    })) {
                                        navigate('/profile')

                                    }else {
                                        setErrors([res.data.message])
                                    }
                                }
                            }).catch((res) => {
                            console.log(res)
                            setErrors([res.response.data.message])
                        })
                    }
                    else {
                        throw data
                    }
                })
                .catch((res) => {
                    console.log(res)
                    setErrors([res.error])
                });
        }
        else {
            setErrors(["Email nie jest poprawny"])
        }

    }
   return (
            <form method="post" onSubmit={OnSubmit}>
                <label>Userame:</label>
                <input required onChange={(e)=>setFormData({...formData, name: e.target.value})}
                       type="text" name="userneme" placeholder="username"/>
                <label>Email:</label>
                <input required onChange={(e)=>setFormData({...formData, email: e.target.value})}
                       type="email" name="email" placeholder="email"/>
                <label>Password:</label>
                <input required onChange={(e)=>setFormData({...formData, password1: e.target.value})}
                       type="password" name="password1"/>
                <label>Repeat password:</label>
                <input required onChange={(e)=>setFormData({...formData, password2: e.target.value})}
                       type="password" name="password2"/>
                <ul>{errors.map((error) =>
                    (
                        <li>{error}</li>
                    )
                )}</ul>
                <button type="submit">Utwórz konto</button>
                <p>Masz już konto? <a href={'/register'}>Zaloguj się</a></p>
            </form>

        )

}