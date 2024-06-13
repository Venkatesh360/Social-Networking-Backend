"use client";

import axios from "axios";
import { useState } from "react";

function SearchFriend() {
    const [username, setUsername] = useState("");
    const [data, setData] = useState(false);
    const [friends, setFriends] = useState({
        uid: null,
        username: null
    });

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            const response = await axios.get("/api/friends/searchUser", {
                params: {
                    username: username.toLowerCase().trim()
                }
            });
            if (response.status === 200) {
                setData(true);
                setFriends(response.data.data);
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
        }
    };

    const handleClick = async () => {
        try {
            const response = await axios.put("/api/friends/addFriend", {
                userId: friends.uid,
                username: friends.username
            });
            if (response.status === 200) {
                // Handle successful friend addition, e.g., show a message
                alert("Friend added successfully!");
            }
        } catch (error) {
            console.error("Error adding friend:", error);
        }
    };

    return (
        <div className="flex flex-col bg-slate-400 h-[30vh]">
            <h4>Search Friend</h4>
            <div className="flex flex-col w-full h-full bg-slate-600">
                <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full bg-green-400 text-wrap p-4 space-y-4">
                    <input
                        type="text"
                        placeholder="search by username"
                        className="w-full p-2"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Search
                    </button>
                </form>
            </div>
            {data && (
                <div className="flex flex-col">
                    <h2>User</h2>
                    <span className="flex">
                        {friends.username}
                        <button onClick={handleClick} className="ml-2 bg-blue-500 text-white p-1 rounded">
                            Add Friend
                        </button>
                    </span>
                </div>
            )}
        </div>
    );
}

export default SearchFriend;
