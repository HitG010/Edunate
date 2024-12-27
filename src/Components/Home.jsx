import React from "react";
import { useState, useEffect } from "react";
import { getUserDetails } from "../APIs/userDetails";

function Home() {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userDetails = await getUserDetails();
            if (userDetails) setUser(userDetails);
        };
        fetchUserDetails();
    }, []);

    const fetchRole = () => {
        const role = localStorage.getItem("role");
        setRole(role);
    }

    useEffect(() => {
        fetchRole();
    }, []);

    if (!user) return <div className="flex h-screen w-full justify-center items-center">Loading...</div>;

    return (
        <div className="flex flex-col items-center mt-32">
            <div className="flex justify-between w-[64%]">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl">Hi, {user.username} 👋</div>
                    <div className="text-5xl font-medium">Dashboard</div>
                    <div className="text-lg">Role: {role}</div>
                </div>
            </div>

            <button onClick={() => {
                        window.location.href = "http://localhost:5000/logout";
                        }
                        } className="px-4 py-2 bg-[#252525] text-[#f1f3f5] rounded-full font-semibold text-xl mt-6">
                        Logout
            </button>
        </div>
    );
}

export default Home;
