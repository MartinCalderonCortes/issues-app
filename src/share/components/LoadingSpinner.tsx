import { FiRefreshCcw } from "react-icons/fi"

export const LoadingSpinner = () => {
    return (
        <div className="flex flex-row w-full h-52 justify-center items-center">
            <FiRefreshCcw size={40} className="animate-spin" />
        </div>
    )
}