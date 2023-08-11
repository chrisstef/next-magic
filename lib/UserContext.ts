import { createContext } from 'react';

interface UserData {
    issuer: string;
    email: string;
    publicAddress: string;
}

export const UserContext = createContext<UserData | null>(null);