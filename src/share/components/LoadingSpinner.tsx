import { FiRefreshCcw } from "react-icons/fi"

export const LoadingSpinner = () => {
    return (
        // <div className="loading">
            <svg className="animate-spin">
                <FiRefreshCcw size={20}/>
            </svg>  
        // </div>
    )
}