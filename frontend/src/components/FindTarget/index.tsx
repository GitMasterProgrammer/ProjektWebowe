import React, { useState } from "react";
import { Target } from "../../interfaces/Target.tsx";

interface FindTargetProps {
    setValue: (par: number) => void;
}

export default function FindTarget({ setValue }: FindTargetProps) {
    const [name, setName] = useState('');
    const [targets, setTargets] = useState<Target[]|null>(null);

    const Refresh = () => {
        const requestOptions = {
            method: 'GET'
        };
        if (name !== "") {
            const seachParams = new URLSearchParams({
                'name': name,
                'orderBy': "likes_desc",
                'maxRows': '5'
            });
            console.log('http://localhost:3000/api/target/get?' + seachParams);
            fetch('http://localhost:3000/api/target/get?' + seachParams, requestOptions)
                .then(response => response.json())
                .then(data => {
                    setTargets(data.recordsLike);
                    console.log(data.recordsLike);
                });
        }
    };

    const Select = (e) => {
        console.log(e.target.getAttribute('targetId'));
        const targetId: number = parseInt(e.target.getAttribute('targetId'));
        setValue(targetId);
        targets?.map(target=>{
            if (target.id === targetId) {
                setName(target.name);
            }
        })
    };

    return (
        <div className="FindTarget">
            <input
                onChange={(e) => {
                    setName(e.target.value);
                    Refresh();
                }}
                type="text"
                className="form-control"
                name="target"
                placeholder="Nazwa osoby"
                value={name}
            />
            <div className="list-group mt-3"> {}
                {targets?.map((target) => (
                    <div
                        key={target.id}
                        targetId={target.id}
                        className="list-group-item"
                        onClick={Select}
                    >
                        <p targetId={target.id} key={target.id}>
                            {target.name}({target.likes}) by {target.creator.name}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
