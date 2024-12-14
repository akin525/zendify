type ActionType = "reverse-payout" | "resend-transaction" | "settle-transaction";

export type Actions = {
    name: string;
    actionType: ActionType;
    crucial?: boolean;
}

export type TableSelectedProps = {
    data: Record<string, string | number>[];
    selectedKeys?: string[];
    toggleActions?: (id: number) => void;
    selectedItemId?: number;
    toggleModal?: (id: number, actionType: string) => void;
    isActionsOpen?: boolean;
    actions: Actions[] | [];
    noMenu?: boolean;
    viewAction: string;
};

export type ValuesProp = {
    id: number;
    [key: string]: string | number;
};