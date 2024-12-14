import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  getBusinessTransactions,
  getRefundedTransactions,
  getTransactions,
  getUnsettledTransactions,
  getWalletTransactions,
  getBusinessWalletTransactions,
  searchTransactions,
} from ".";
import {
  useRefundedTransactionsStore,
  useTransactionsStore,
  useUnsettledTransactionsStore,
  useWalletTransactionsStore,
} from "@/stores/transactions";

export const useBusinessTransactionsData = ({
  businessId,
  page,
  config = {},
}) => {
  return useQuery({
    ...config,
    queryKey: ["business-transactions", page, businessId],
    queryFn: () => getBusinessTransactions(businessId, page),

    placeholderData: keepPreviousData,
  });
};

export const useTransactions = ({ page, searchQuery, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["transactions", page, searchQuery],
    queryFn: () =>
      searchQuery
        ? searchTransactions(searchQuery, page)
        : getTransactions(page),

    placeholderData: searchQuery ? undefined : keepPreviousData,
  });
};

export const useUnsettledTransactions = ({ page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["unsettled-transactions", page],
    queryFn: () => getUnsettledTransactions(page),

    placeholderData: keepPreviousData,
  });
};

export const useRefundedTransactions = ({ page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["refunded-transactions", page],
    queryFn: () => getRefundedTransactions(page),

    placeholderData: keepPreviousData,
  });
};

export const useWalletTransactions = ({ page, config = {} }) => {
  return useQuery({
    ...config,
    queryKey: ["wallet-transactions", page],
    queryFn: () => getWalletTransactions(page),

    placeholderData: keepPreviousData,
  });
};
export const useBusinessWalletTransactions = ({
  businessId,
  page,
  config = {},
}) => {
  return useQuery({
    ...config,
    queryKey: ["business-wallet-transactions", businessId, page],
    queryFn: () => getBusinessWalletTransactions(businessId, page),

    placeholderData: keepPreviousData,
  });
};

export const useTransactionData = () => {
  const { page, searchQuery } = useTransactionsStore();
  return useTransactions({ page, searchQuery });
};

export const useUnsettledTransactionData = () => {
  const { page } = useUnsettledTransactionsStore();
  return useUnsettledTransactions({ page });
};

export const useRefundedTransactionData = () => {
  const { page } = useRefundedTransactionsStore();
  return useRefundedTransactions({ page });
};

export const useWalletTransactionsData = () => {
  const { page } = useWalletTransactionsStore();
  return useWalletTransactions({ page });
};
