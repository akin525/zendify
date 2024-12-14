type UserRole = 'admin' | 'superadmin' | 'staff';

interface User {
    address: string;
    api_token: string | null;
    city: string;
    compliance: number;
    created_at: Date | null;
    email: string;
    id: number;
    image: string;
    login_time: Date | null;
    manage_business: 0 | 1;
    manage_payout: 0 | 1;
    manage_refund: 0 | 1;
    manage_staff: 0 | 1;
    manage_user: 0 | 1;
    name: string;
    pass_changed: Date | null;
    phone: string;
    remember_token: string | null;
    role: UserRole;
    save_log: 0 | 1;
    setting: 0 | 1;
    settle_transaction: 0 | 1;
    state: string;
    status: 0 | 1;
    updated_at: Date | null;
    username: string;
    view_audit_log: 0 | 1;
    view_business: 0 | 1;
}

export interface LoginResponse {
    success: boolean;
    status: string;
    token: string;
    accessToken: string;
    staff: User;
}