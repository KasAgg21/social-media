'use client';

import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import AuthContext from '@/context/AuthContext';
import Link from 'next/link';

const Login = () => {
    const authContext = useContext(AuthContext);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const router = useRouter();

    const { email, password } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setFormData({ ...formData, [e.target.name]: e.target.value });

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:5000/api/auth/login', formData);
            if (authContext) {
                authContext.login(res.data.token);
            }
            router.push('/');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800">Login</h1>
                <form onSubmit={onSubmit} className="space-y-6">
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={onChange}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
                    >
                        Login
                    </button>
                </form>
                <p className="text-center text-gray-600">
                    Don&apos;t have an account?{' '}
                    <Link href="/signup" className="text-blue-500 hover:underline">
                        Sign up
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default Login; 