interface WrapperProps {
    children:React.ReactNode,
}

export const WrapperComponent:React.FC<WrapperProps> = ({children}:WrapperProps) => {
    return(
        <main className='flex justify-center items-center h-full w-full bg-slate-100'>
            {children}
        </main>
    )
}