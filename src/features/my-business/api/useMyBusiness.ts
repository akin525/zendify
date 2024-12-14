import { useInfiniteQuery } from "@tanstack/react-query"
import { getMyBusiness } from "./getMyBusiness"


export const useMyBusiness = () => {
    return useInfiniteQuery({
        queryKey: ['my-business'],
        queryFn: ({ pageParam = 1 }) => getMyBusiness(pageParam),
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