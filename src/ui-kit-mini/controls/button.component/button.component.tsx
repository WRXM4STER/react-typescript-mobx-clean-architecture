import { useEffect, useState } from "react"

interface ButtonProps {
    children:React.ReactNode,
    variant?: "primary" | "danger"
    type: "submit" | "button",
    onClick?:(e: React.MouseEvent<HTMLElement>)=>void,
    className?:string
}

export const ButtonComponent:React.FC<ButtonProps> = ({children, variant, className, ...props}:ButtonProps) => {

    const [bgColor, setBgColor] = useState('')

    useEffect(() => {
        if (variant==='primary') {
            setBgColor('bg-sky-500/100')
            return
        }
        if (variant==='danger') {
            setBgColor('bg-red-500/100')
            return
        }
        setBgColor('bg-sky-500/100')
    },[variant])

    return (
        <button 
            className={"border-0 rounded-md px-4 py-2  text-[#EBF4F8] shadow-md transition ease-in-out delay-2 hover:shadow-xl " + bgColor + " " + className}
            {...props}
        >
            {children}
        </button>
    )
}