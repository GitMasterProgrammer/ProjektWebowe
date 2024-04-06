import React, {ChangeEventHandler} from "react";


export class RegisterForm extends React.Component{
    // @ts-expect-error becouse yes
    constructor(props) {
        super(props);
        this.state = {sended: false, errorMessages: [], result: "Nie wyslano"};
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(event : ChangeEventHandler) {
        const target = event.target
        const value = target.value
        const name = target.name
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event ) {
        event.preventDefault()

    }
    render() {
        return (
            <form method="post" onSubmit={this.handleSubmit}>
                <label>Userame:</label>
                <input value={this.state.name} required onChange={this.handleInputChange}
                       type="text" name="userneme" placeholder="username"/>
                <label>Email:</label>
                <input value={this.state.location} required onChange={this.handleInputChange}
                       type="email" name="email" placeholder="email"/>
                <label>Password:</label>
                <input value={this.state.password1} required onChange={this.handleInputChange}
                       type="password" name="password1"/>
                <label>Repeat password:</label>
                <input value={this.state.password2} required onChange={this.handleInputChange}
                       type="password" name="password2"/>
                <button type="submit">Utwórz konto</button>
                <p>Masz już konto? <a href={'/register'}>Zaloguj się</a></p>
            </form>

        )
    }

}