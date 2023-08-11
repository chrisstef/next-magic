import { useContext, useState, useEffect } from 'react';
import { UserContext } from '@/lib/UserContext';
import { useRouter } from 'next/router';
import { magic } from '@/lib/magic';

export default function Login(): JSX.Element {
    const [user, setUser] = useContext(UserContext);
    const [email, setEmail] = useState<string>('');
    // Create our router
    const router = useRouter();

    // Make sure to add useEffect to your imports at the top
    useEffect(() => {
        // Check for an issuer on our user object. If it exists, route them to the dashboard.
        user?.issuer && router.push('/dashboard');
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Log in using our email with Magic and store the returned DID token in a variable
        try {
            const didToken = await magic?.auth.loginWithMagicLink({
                email,
            });

            // Send this token to our validation endpoint
            const res = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                    Authorization: `Bearer ${didToken}`,
                },
            });

            // If successful, update our user state with their metadata and route to the dashboard
            if (res.ok) {
                const userMetadata = await magic?.user.getMetadata();
                setUser(userMetadata);
                router.push('/dashboard');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className='max-w-md mx-auto mt-4 p-4'>
            <h1 className='font-poppins font-bold'>Next Magic</h1>
            <form className='font-poppins ' onSubmit={handleLogin}>
                <label htmlFor="email" className='block font-medium text-white'>Email</label>
                <input
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className='mt-1 block w-full border p-1 rounded-md shadow-sm bg-gray-900 text-white focus:ring focus:ring-opacity-50'
                />
                <button type="submit" className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50'>
                    Send Magic Link
                </button>
            </form>
        </div>

    );
}
