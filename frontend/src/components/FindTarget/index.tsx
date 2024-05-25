import React, {useState} from "react";
import {Target} from "../../interfaces/Target.tsx";

interface FindTargetProps {
    setValue: (par: number) => void;
}
export default function FindTarget({setValue}: FindTargetProps) {
    const t:Target[] = []
    const [name, setName]= useState('')
    const [targets, setTargets]= useState(t)
    const [selected, setSelected]=useState(undefined)

    const Refresh = () => {

        //TODO: change orderto likes desc later
        const requestOptions = {
            method: 'GET'
        };
        if (name != "") {
            const seachParams = new URLSearchParams({
                'name': name,
                'orderBy': "name_asc",
                'maxRows': '5'
            })
            console.log('http://localhost:3000/api/target/get?' + seachParams)
            fetch('http://localhost:3000/api/target/get?' + seachParams, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setTargets(data.record)
                    console.log(targets)
                });
        }
    }

    const Select = (e) => {
        console.log(e.target.getAttribute('targetId'))
        const targetId:number = parseInt(e.target.getAttribute('targetId'))
        setValue(targetId)
    }

    //TODO: add likes to display
    return <div className="FindTarget">
        <input required onChange={(e) => {
            setName(e.target.value)
            Refresh()
        }}
               type="text" name="target" placeholder="Target's name"/>
        <div className={'targetList'}>
            {targets.map((target) => (
                <div  key={target.id} targetId={target.id} onClick={Select}>
                    <p targetId={target.id} key={target.id}>{target.name}(010) by {target.creator.name}</p>
                </div>
            ))}
        </div>
    </div>;

}