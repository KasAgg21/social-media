'use client';

import Link from 'next/link';
import { useContext } from 'react';
import AuthContext from '@/context/AuthContext';

const Navbar = () => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        return null; // or a loading spinner
    }

    const { isAuthenticated, logout } = authContext;

    return (
        <nav className="bg-white shadow-md">
            <div className="container mx-auto flex justify-between items-center p-4">
                <Link href="/" className="text-xl font-bold text-gray-800 hover:text-gray-600">
                    Sociagram
                </Link>
                <div className="flex gap-6 items-center">
                    {isAuthenticated ? (
                        <>
                            <Link href="/profile" className="text-gray-600 hover:text-gray-800">
                                Profile
                            </Link>
                            <button
                                onClick={logout}
                                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="text-gray-600 hover:text-gray-800">
                                Login
                            </Link>
                            <Link
                                href="/signup"
                                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                            >
                                Signup
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; 