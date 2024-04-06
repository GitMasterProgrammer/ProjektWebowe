import React, {ChangeEventHandler} from "react";


export class BuildingForm extends React.Component{
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
                <label>Name:</label>
                <input value={this.state.email} required onChange={this.handleInputChange} type="text" name="name"
                       placeholder="name"/>
                <label>Address:</label>
                <textarea value={this.state.address} required onChange={this.handleInputChange}
                          name="address" placeholder="address"></textarea>
                <button type="submit">Utwórz osobę</button>
            </form>

        )
    }

}