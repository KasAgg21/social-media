'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';

interface Post {
    _id: string;
    content: string;
    image?: string;
    author: {
        name: string;
        profilePicture?: string;
    };
    likes: number;
    createdAt: string;
}

interface FeedProps {
    refresh: boolean;
}

const Feed = ({ refresh }: FeedProps) => {
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);

    const handleLike = async (postId: string) => {
        try {
            const res = await axios.post(`http://localhost:5000/api/posts/like/${postId}`);
            setPosts(posts.map(post =>
                post._id === postId ? { ...post, likes: res.data } : post
            ));
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get('http://localhost:5000/api/posts');
                setPosts(res.data);
                setLoading(false);
            } catch (err) {
                console.error(err);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [refresh]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Feed</h1>
            <div className="space-y-6">
                {posts.map((post) => (
                    <div key={post._id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                        <div className="flex items-center mb-4">
                            <img
                                src={post.author.profilePicture ? `http://localhost:5000/${post.author.profilePicture}` : '/default-avatar.png'}
                                alt={post.author.name}
                                className="w-12 h-12 rounded-full mr-4 object-cover"
                            />
                            <div>
                                <p className="font-semibold text-lg text-gray-900">{post.author.name}</p>
                                <p className="text-sm text-gray-500">
                                    {new Date(post.createdAt).toLocaleString()}
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-800 mb-4">{post.content}</p>
                        {post.image && (
                            <div className="mb-4">
                                <img
                                    src={`http://localhost:5000/${post.image}`}
                                    alt="Post"
                                    className="rounded-lg max-w-full h-auto"
                                />
                            </div>
                        )}
                        <div className="flex items-center">
                            <button
                                onClick={() => handleLike(post._id)}
                                className="flex items-center text-red-500 hover:text-red-600 font-semibold"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                                </svg>
                                Like
                            </button>
                            <span className="ml-3 text-gray-600">{post.likes} likes</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Feed; 