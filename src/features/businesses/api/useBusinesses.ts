import { useInfiniteQuery, useQuery } from "@tanstack/react-query"
import { getBusinessDetails, getBusinesses } from "./getBusinesses"


export const useBusinesses = () => {
    return useInfiniteQuery({
        queryKey: ['businesses'],
        queryFn: ({ pageParam = 1 }) => getBusinesses(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            const nextPageParam =
                lastPage?.data?.current_page !== lastPage?.data?.last_page
                    ? pages.length + 1
                    : undefined;
            return nextPageParam;
        }
    })
}

export const useBusinessDetails = (id: number | string) => {
    return useQuery({
        queryKey: ['business-details', id],
        queryFn: () => getBusinessDetails(id)
    })
}