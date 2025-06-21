'use client';

import { useState } from 'react';
import axios from 'axios';

interface CreatePostProps {
    onPostCreated: () => void;
}

const CreatePost = ({ onPostCreated }: CreatePostProps) => {
    const [content, setContent] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFile(e.target.files[0]);
        }
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('content', content);
        if (file) {
            formData.append('postImage', file);
        }

        try {
            await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/posts`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setContent('');
            setFile(null);
            if(onPostCreated) onPostCreated();
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 mb-6 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Create a New Post</h2>
            <form onSubmit={onSubmit}>
                <textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    placeholder="What's on your mind?"
                    rows={4}
                ></textarea>
                <div className="mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-700">Upload Image</label>
                    <input
                        type="file"
                        name="postImage"
                        onChange={onFileChange}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-lg mt-4 transition w-full"
                >
                    Post
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
