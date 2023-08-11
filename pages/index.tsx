import type { NextPage } from "next";
import { useContext } from 'react';
import { UserContext } from '@/lib/UserContext';
import { Loading } from "@/components/Loading";

const Home: NextPage = () => {
    const [user] = useContext(UserContext);

    return (
        <div>
            {/* Check to see if we are in a loading state and display a message if true */}
            {user?.loading && <Loading />}
        </div>
    );
};

export default Home;
