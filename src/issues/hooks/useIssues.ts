import { useQuery } from "@tanstack/react-query"
import { getIssues } from "../actions/get-issues"
import { State } from "../interfaces/issues"
import { useEffect, useState } from "react"

interface Props {
    state: State,
    selectedLabels: Array<string>
}

export const useIssues = ({ state, selectedLabels } : Props) => {
    const [page, setPage] = useState(1);

    const issuesQuery = useQuery({
        queryKey: ['issues', { state, selectedLabels, page }],
        queryFn: () => getIssues(state, selectedLabels, page),
        staleTime: 1000 * 60
    }) 

    const previousPage = () => {
        if(page === 1) return 

        setPage((prevPage) => prevPage - 1)
    }

    const nextPage = () => {
        if(issuesQuery.data?.length === 0) return

        setPage((prevPage) => prevPage + 1)
    }

    useEffect(() => {
      setPage(1);
    }, [state, selectedLabels]);
    
    return {
        issuesQuery,
        page,
        previousPage,
        nextPage
    }
}