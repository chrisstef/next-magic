import { useContext } from 'react';
import { UserContext } from '@/lib/UserContext';
import { magic } from '@/lib/magic';
import { useRouter } from 'next/router';
import { Loading } from '@/components/Loading';

export default function Dashboard(): JSX.Element {
    const [user, setUser] = useContext(UserContext);
    // Create our router
    const router = useRouter();

    const logout = () => {
        // Call Magic's logout method, reset the user state, and route to the login page
        magic?.user.logout().then(() => {
            setUser(null);
            router.push('/login');
        });
    };

    if (!user) {
        return <Loading />;
    }

    return (
        <>
            {user.issuer ? (

                <div className='max-w-md mx-auto mt-4 p-4'>
                    <h1>Dashboard</h1>
                    <h2>Email</h2>
                    <p>{user.email}</p>
                    <h2>Wallet Address</h2>
                    <p>{user.publicAddress}</p>
                    <button className='mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-opacity-50' onClick={logout}>Logout</button>
                </div>


            ) : (
                <Loading />
            )}
        </>
    );
}
