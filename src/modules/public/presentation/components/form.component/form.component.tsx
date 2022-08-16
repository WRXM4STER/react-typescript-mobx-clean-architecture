interface FormProps {
    children:React.ReactNode,
    onSubmit:(event: React.FormEvent<HTMLFormElement>)=>void
}

export const FormComponent:React.FC<FormProps> = ({children, ...props}:FormProps) => {
    return(
        <form 
            className="flex flex-col justify-center items-center gap-6 p-4 bg-white shadow-md rounded-3xl w-80" 
            {...props}
        >
            {children}
        </form>
    )
}