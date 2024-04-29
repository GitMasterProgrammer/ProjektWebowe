import axios from "axios";
import React from "react";
import useSignIn from "react-auth-kit/hooks/useSignIn";
import bcrypt from 'bcryptjs'
import {useNavigate} from "react-router-dom";
import validateEmail from "../../helpers/validateEmail.tsx";

export default function LoginForm(){
    const signIn = useSignIn()
    const [formData, setFormData] = React.useState({email: '', password: ''})
    const [errors, setErrors] = React.useState("")
    const navigate = useNavigate ();

    const onSubmit = (e) => {
        e.preventDefault()
        if(!validateEmail(formData.email)){
            setErrors("Email jest niepoprawny")
            return
        }

        const reqData = {
            email: formData.email,
            password: bcrypt.hashSync(formData.password, '$2a$10$CwTycUXWue0Thq9StjUM0u'),
        }

        console.log(formData)
        axios.post('http://localhost:3000/api/post/login', reqData)
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
                    })){
                        navigate(-1)

                    }else {
                        setErrors(res.data.message)
                    }
                }
            }).catch((res) => {
            console.log(res)
                setErrors(res.response.data.message)
        })
    }
        return (
            <form method="post" onSubmit={onSubmit}>
                <label>Email:</label>
                <input required onChange={(e)=>setFormData({...formData, email: e.target.value})} type="email" name="email"
                       placeholder="email"/>
                <label>Password:</label>
                <input required onChange={(e)=>setFormData({...formData, password: e.target.value})}
                       type="password" name="password"  />
                <p>{errors}</p>
                <button type="submit">Zaloguj się</button>
                <p>Nie masz konta? <a href={'/register'}>Zarejestruj się</a></p>
            </form>
        )

}