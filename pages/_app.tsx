import '@/styles/globals.css';
import { useState, useEffect } from 'react';
import { UserContext } from '@/lib/UserContext';
import { useRouter } from 'next/router';
import { magic } from '@/lib/magic';

interface User {
    loading: boolean;
    // You should define the structure of your user data here
}

interface AppProps {
    Component: React.ElementType;
    pageProps: Record<string, unknown>; // Replace with actual type
}

export default function App({ Component, pageProps }: AppProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null);
    // Create our router
    const router = useRouter();

    useEffect(() => {
        // Set loading to true to display our loading message within pages/index.js
        setUser({ loading: true });
        // Check if the user is authenticated already
        magic?.user.isLoggedIn().then((isLoggedIn) => {
            if (isLoggedIn) {
                // Pull their metadata, update our state, and route to dashboard
                magic?.user.getMetadata().then((userData) => setUser(userData));
                router.push('/dashboard');
            } else {
                // If false, route them to the login page and reset the user state
                router.push('/login');
                setUser(null);
            }
        });
        // Add an empty dependency array so the useEffect only runs once upon page load
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <UserContext.Provider value={[user, setUser]}>
            <Component {...pageProps} />
        </UserContext.Provider>
    );
}