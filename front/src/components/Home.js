import React from 'react';
import { useAuth } from './AuthProvider';

export default function Home () {
    const { logoutUser, loading, error } = useAuth();

    return(
        <div>
            <p>Home.</p>
            <button onClick={logoutUser}>Logout</button>
        </div>
    );
}