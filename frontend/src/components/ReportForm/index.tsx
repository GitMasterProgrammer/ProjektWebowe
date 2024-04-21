import React, {ChangeEventHandler} from "react";


export default function ReportForm(){
    // @ts-expect-error becouse yes
    const [targets, setTargets] = React.useState([
        {id: 1, name: "Pyssa"},
        {id: 2, name: "Pyssa2"},
        {id: 3, name: "Pyssa3"},
    ])
    const [formData, setFormData] = React.useState({target: '', coordinates: '', details: ''})
    const [errors, setErrors] = React.useState("")

    const  OnSubmit = (event ) => {
        event.preventDefault()

    }
    return (
            <form method="post" onSubmit={OnSubmit}>
                <label>Target (Write name or select from list):</label>
                <input required onChange={(e)=>setFormData({...formData, target: e.target.value})}
                       type="text" name="target" placeholder="Target's name"/>
                <select name="targetId">
                    {
                        targets.map(target =>
                            (<option value={target.id}>{target.name}</option>)
                        )
                    }

                </select>
                <label>Address:</label>
                <input required onChange={(e)=>setFormData({...formData, target: e.target.value})}
                       type="text" name="address" placeholder="address"/>
                <label>Coordinates:</label>
                <input onChange={(e)=>setFormData({...formData, coordinates: e.target.value})}
                       type="text" name="coordinates"/>
                <label>Datails:</label>
                <textarea required onChange={(e)=>setFormData({...formData, details: e.target.value})}
                       name="datails"></textarea>
                <p>{errors}</p>
                <button type="submit">Zgłoś</button>
                {/*<p>Masz już konto? <a href={'/register'}>Zaloguj się</a></p>*/}
            </form>

        )
}