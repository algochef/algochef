
const CustomLabel = ({
    title,
    count,
    onClick = () => { }
}: {
    title: string,
    count?: number,
    onClick?: () => void

}) => {
    return (
        <div className="px-2 py-0.5 bg-gradient-to-t from-blue-300/20 to-blue-50 flex space-x-1 text-xs w-fit border-[1px] border-blue-300 rounded-md h-fit dark:from-blue-800/20 dark:to-blue-500/20 dark:border-gray-800">
            <p>{title}</p>
            {count&&<p className="rounded-md bg-gradient-to-b from-orange-300/40 to-orange-50 px-1.5 h-fit border-orange-300 border-[1px] dark:border-gray-800 dark:from-orange-300/80 dark:to-orange-500/80">{count}</p>}
        </div>
    )
}

export default CustomLabel