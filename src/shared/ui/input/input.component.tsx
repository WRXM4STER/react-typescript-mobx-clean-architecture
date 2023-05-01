interface InputProps {
    id?:string,
    type:"text" | "password",
    placeholder?:string,
    value:string,
    onChange:(event: React.FormEvent<HTMLInputElement>)=>void,
    className?:string,
}

export const InputComponent:React.FC<InputProps> = ({id, className, ...props}:InputProps) => {
    return (
        <>
            <label htmlFor={id} className="hidden">{id}</label>
            <input 
                id={id}
                className={"border text-slate-600 rounded-md p-2 " + className}
                {...props}
            />
        </>
    )
}