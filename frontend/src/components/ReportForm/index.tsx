import React, {ChangeEventHandler} from "react";


export class ReportForm extends React.Component{
    // @ts-expect-error becouse yes
    constructor(props) {
        super(props);

        // load targets
        const targets = [
            {id: 1, name: "Pyssa"},
            {id: 2, name: "Pyssa2"},
            {id: 3, name: "Pyssa3"},
        ]

        this.state = {sended: false, errorMessages: [], result: "Nie wyslano", targets: targets};
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
                <label>Target (Write name or select from list):</label>
                <input value={this.state.target} required onChange={this.handleInputChange}
                       type="text" name="target" placeholder="Target's name"/>
                <select name="targetId">
                    {
                        this.state.targets.map(target =>
                            (<option value={target.id}>{target.name}</option>)
                        )
                    }

                </select>
                <label>Address:</label>
                <input value={this.state.address} required onChange={this.handleInputChange}
                       type="text" name="address" placeholder="address"/>
                <label>Coordinates:</label>
                <input value={this.state.coordinates} onChange={this.handleInputChange}
                       type="text" name="coordinates"/>
                <label>Datails:</label>
                <textarea value={this.state.datails} required onChange={this.handleInputChange}
                       name="datails"></textarea>
                <button type="submit">Zgłoś</button>
                {/*<p>Masz już konto? <a href={'/register'}>Zaloguj się</a></p>*/}
            </form>

        )
    }

}