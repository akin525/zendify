import axios_instance from "@/lib/axios";

// Terminal Summary
export async function getTerminalSummary() {
    try {
        const response = await axios_instance.get(
            `/terminals`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching data!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// All Terminals
export async function getAllTerminal(page: number | string = 1) {
    try {
        const response = await axios_instance.get(
            `/all_terminals?page=${page}`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching data!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// Mapped Terminals
export async function getMappedTerminal(page: number | string = 1) {
    try {
        const response = await axios_instance.get(
            `/mapped_terminals?page=${page}`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching data!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// Unmapped Terminals
export async function getUnmappedTerminal(page: number | string = 1) {
    try {
        const response = await axios_instance.get(
            `/unmapped_terminals?page=${page}`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching data!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// Terminal Dashboard With ID
export async function getTerminalDashboard(id: string) {
    try {
        const response = await axios_instance.get(
            `/terminal_dashboard/${id}`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching data!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// Terminal Start Levels
export async function getTerminalStartLevels() {
    try {
        const response = await axios_instance.get(
            `/start_levels`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching data!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// Terminal Start Levels Rules
export async function getTerminalStartLevelsRules() {
    try {
        const response = await axios_instance.get(
            `/start_level_rules`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching data!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// Terminal Transactions with Business ID
export async function getTerminalTransactions({ businessId, page = 1 }: { businessId: string, page: string | number }) {
    try {
        const response = await axios_instance.get(
            `/terminal_transactions/${businessId}?page=${page}`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching data!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// Terminal Trnasaction Search With Business ID and Payload - search, start_date and end_date
export async function searchTerminalTransactions({ businessId, payload }: { businessId: string, payload: { search: string, start_date: string, end_date: string } }) {
    try {
        const response = await axios_instance.post(
            `/terminal_transaction_search/${businessId}/search`,
            payload
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching data!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// Transaction Details with Id and Transaction ID
export async function getTransactionDetails({ id, transactionId }: { id: string, transactionId: string }) {
    try {
        const response = await axios_instance.get(
            `/terminal_transaction_details/${id}/${transactionId}`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching data!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// Transaction Daily Report with Business ID and date
export async function getTransactionDailyReport({ businessId, date }: { businessId: string, date: string }) {
    try {
        const response = await axios_instance.get(
            `/terminal_daily_report/${businessId}/${date}`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching data!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// Terminal Send Daily Report with Business ID and Payload - email and date
export async function sendTerminalDailyReport({ businessId, payload }: { businessId: string, payload: { email: string, date: string } }) {
    try {
        const response = await axios_instance.post(
            `/terminal_send_daily_report/${businessId}`,
            payload
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while sending daily report!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}


// get terminal bank tranfer status with business id and status
export async function getTerminalBankTransferStatus({ businessId, status }: { businessId: string, status: string }) {
    try {
        const response = await axios_instance.get(
            `/bank_transfer_status/${businessId}/${status}`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching bank transfer status!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// get terminal bills payment status with business id and status
export async function getTerminalBillsPaymentStatus({ businessId, status }: { businessId: string, status: string }) {
    try {
        const response = await axios_instance.get(
            `/bills_payment_status/${businessId}/${status}`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching bills payment status!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}

// get terminal card tranfer status with business id and status
export async function getTerminalCardTransferStatus({ businessId, status }: { businessId: string, status: string }) {
    try {
        const response = await axios_instance.get(
            `/card_transfer_status/${businessId}/${status}`,
        );
        if (!response.data.success) {
            const errorMessage = response?.data?.message || "An error occurred while fetching card transfer status!";
            throw new Error(errorMessage);
        }
        return response.data;
    } catch (error) {
        throw new Error(
            error?.response?.data?.message ||
            error?.message,
        );
    }
}
