    import { useState } from "react";
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
                console.log("NIGGA")
                const seachParams = new URLSearchParams({
                    'name': name,
                    'orderBy': "likes_desc",
                    'maxRows': '5'
                });
                //console.log('http://localhost:3000/api/target/get?' + seachParams);
                fetch('http://localhost:3000/api/target/get?' + seachParams, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data)
                        setTargets(data.recordsLike);
                        console.log(data.recordsLike);
                    });
            }
        };

        const Select = (e : any) => {
            console.log(e.target.getAttribute('data-target-id'));
            const targetId: number = parseInt(e.target.getAttribute('data-target-id'));
            setValue(targetId);
            targets?.map(target=> {
                if (target.id === targetId) {
                    setName(target.name);
                }
            })
            setTargets(null)
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
                <div className="list-group mt-3">
                    {targets?.map((target) => (
                        <div
                            key={target.id}
                            data-target-id={target.id}
                            className="list-group-item"
                            onClick={Select}
                        >
                            <p data-target-id={target.id} key={target.id}>
                                {target.name}({target.likes}) by {target.creator.name}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
