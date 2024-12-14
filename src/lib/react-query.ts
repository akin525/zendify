import { defaultStaleTime } from '@/constants/queryOptions';
import { DefaultOptions, QueryClient, } from '@tanstack/react-query';

const queryConfig: DefaultOptions = {
    queries: {
        refetchOnWindowFocus: true,
        retry: false,
        staleTime: defaultStaleTime,
    },
};

export const queryClient = new QueryClient({ defaultOptions: queryConfig });

// export type ExtractFnReturnType<FnType extends (...args: any) => any> = PromiseValue<
//     ReturnType<FnType>
// >;

// export type QueryConfig<QueryFnType extends (...args: any) => any> = Omit<
//     UseQueryOptions<ExtractFnReturnType<QueryFnType>>,
//     'queryKey' | 'queryFn'
// >;

// export type MutationConfig<MutationFnType extends (...args: any) => any> = UseMutationOptions<
//     ExtractFnReturnType<MutationFnType>,
//     AxiosError,
//     Parameters<MutationFnType>[0]
// >;