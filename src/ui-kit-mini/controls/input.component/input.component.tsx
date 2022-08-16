interface InputProps {
    type:"text" | "password",
    placeholder?:string,
    value:string,
    onChange:(event: React.FormEvent<HTMLInputElement>)=>void,
    className?:string
}

export const InputComponent:React.FC<InputProps> = ({className, ...props}:InputProps) => {
    return (
        <input 
            className={"border text-slate-600 rounded-md p-2 " + className}
            {...props}
        />
    )
}