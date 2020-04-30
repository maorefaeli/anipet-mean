export const enum Role {
    Guest,
    User,
    Admin
}

export default class User {
    id: string;
    username: string;
    isAdmin: boolean;
    // Shipping address
    name?: string;
    city?: string
    street?: string;
    email?: string;
    phone?: string;
    postal?: number;
}
