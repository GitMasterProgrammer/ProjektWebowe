import React, {ChangeEventHandler} from "react";
import  './index.css'


export class LoginForm extends React.Component{
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
                {/*<label>Name:</label>*/}
                {/*<input value={this.state.name} onChange={this.handleInputChange} type="text" name="name"*/}
                {/*       placeholder="name"/>*/}
                {/*<label>location:</label>*/}
                {/*<input value={this.state.location} onChange={this.handleInputChange} type="text" name="location"*/}
                {/*       placeholder="location"/>*/}
                {/*<label>Date:</label>*/}
                {/*<input value={this.state.date} onChange={this.handleInputChange} type="date" name="date"*/}
                {/*       placeholder="data"/>*/}
                {/*<label>Id only for updating</label>*/}
                {/*<input value={this.state.id} onChange={this.handleInputChange} type="number" name="id"*/}
                {/*       placeholder="id"/>*/}
                <button type="submit">Wyślij</button>
            </form>

        )
    }

}