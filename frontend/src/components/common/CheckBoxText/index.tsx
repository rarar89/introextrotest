
type Params = {
    text: string,
    onClick: () => void,
    active: boolean
}

export default function CheckBoxText ({text, onClick, active}:Params) {

    return <div className="flex" onClick={onClick}>
        <div className="form-control">
            <label className="label cursor-pointer">
                <input type="checkbox" checked={active} onChange={onClick} className="checkbox" />
                <span className="label-text p-2">{text}</span> 
            </label>
        </div>
    </div>;
}
