'use client';

import { useContext, useState, useEffect } from 'react';
import AuthContext from '@/context/AuthContext';
import axios from 'axios';

const Profile = () => {
    const authContext = useContext(AuthContext);

    const [formData, setFormData] = useState({
        name: '',
        bio: '',
    });
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        if (authContext?.user) {
            setFormData({
                name: authContext.user.name,
                bio: authContext.user.bio || '',
            });
        }
    }, [authContext?.user]);

    if (authContext?.loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (!authContext?.isAuthenticated || !authContext.user) {
        return (
            <div className="text-center text-gray-600">
                Please log in to view this page.
            </div>
        );
    }

    const { name, bio } = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    
    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const body = new FormData();
        body.append('name', name);
        body.append('bio', bio);
        if (file) {
            body.append('profilePicture', file);
        }

        try {
            await axios.put(`http://localhost:5000/api/users/${authContext.user?._id}`, body, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            alert('Profile Updated!');
            // You might want to reload the user data in the context here
        } catch (err) {
            console.error(err);
            alert('Error updating profile');
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Your Profile</h1>
            <div className="flex flex-col items-center mb-6">
                <img
                    src={authContext.user.profilePicture ? `http://localhost:5000/${authContext.user.profilePicture}` : '/default-avatar.png'}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-gray-200"
                />
            </div>
            <form onSubmit={onSubmit} className="space-y-6">
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={name}
                        onChange={onChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    />
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                        name="bio"
                        value={bio}
                        onChange={onChange}
                        rows={4}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    ></textarea>
                </div>
                <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">Profile Picture</label>
                    <input
                        type="file"
                        name="profilePicture"
                        onChange={onFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
                >
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;
