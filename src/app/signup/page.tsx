"use client";

import axios from 'axios';
import { useRouter } from "next/navigation";
import React, { useState } from 'react';

const SignIn: React.FC = () => {
    const router = useRouter();

    const [user, setUser] = useState({ name: '', email: '', password: '', number:'' });
    const [loading, setLoading] = useState(false)
    const [buttonDisabled, setButtonDisabled] = useState(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUser((prevUser) => ({
            ...prevUser,
            [name]: value,
        }));
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Here we just log the user object to the console
        console.log('User object:', user);
    };

    const onSignUp = async () => {
        try {
          setLoading(true)
          const response = await axios.post("api/user/signup", user);
          console.log("Sing Up successful", response);
          router.push("/login")
    
        } catch (error: any) {
          console.log("SignUp failed", error.message);
    
        } finally {
          setLoading(false);
        }
      }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center text-gray-700">Sign In</h2>
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            required
                            className="block w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            value={user.name}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            required
                            className="block w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            value={user.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            autoComplete="new-password"
                            required
                            className="block w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            value={user.password}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="number" className="block text-sm font-medium text-gray-700">
                        Phone number
                        </label>
                        <input
                            id="number"
                            name="number" // Change to match the state key
                            type="number"
                            autoComplete="number"
                            required
                            className="block w-full px-4 py-2 mt-1 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                            value={user.number}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            onClick={onSignUp}
                            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Sign In
                        </button>
                    </div>
                </form>
                <p className="mt-2 text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <a href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Login
                    </a>
                </p>
            </div>
        </div>
    );
};

export default SignIn;
