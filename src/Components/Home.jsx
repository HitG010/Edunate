import React from "react";
import { useState, useEffect } from "react";
import { getUserDetails } from "../APIs/userDetails";

function Home() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            const userDetails = await getUserDetails();
            if (userDetails) setUser(userDetails);
        };
        fetchUserDetails();
    }, []);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center mt-32">
            <div className="flex justify-between w-[64%]">
                <div className="flex flex-col gap-2">
                    <div className="text-2xl">Hi, {user.username} 👋</div>
                    <div className="text-5xl font-medium">Dashboard</div>
                </div>
                <div className="flex gap-8 px-4 py-4 rounded-[10px] bg-[#252525] items-center justify-center">
                    <div className="flex flex-col">
                        <div>Detect Deepfakes with High Accuracy!</div>
                        <div> upload your video now.</div>
                    </div>
                    <button className="px-4 py-2 bg-[#f1f3f5] text-[#1e1e1e] rounded-full font-semibold text-xl flex gap-2">
                        Upload Video
                    </button>
                </div>
            </div>

            <div className='flex gap-8 mt-4'>
                <div className=" flex gap-8 px-[20px] py-4 bg-[#252525] rounded-[10px]">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#B535BE25]">
                    </div>
                    <div className="">
                        <div className="text-4xl font-medium">20</div>
                        <div className="text-xl text-[#ffffff50]">Videos Analyzed</div>
                    </div>
                </div>

                <div className=" flex gap-8 px-[20px] py-4 bg-[#252525] rounded-[10px]">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#FFDD5525]">
                    </div>
                    <div className="">
                        <div className="text-4xl font-medium">95.3%</div>
                        <div className="text-xl text-[#ffffff50]">Detection Accuracy </div>
                    </div>
                </div>
                <div className=" flex gap-8 px-[20px] py-4 bg-[#252525] rounded-[10px]">
                    <div className="flex items-center justify-center h-16 w-16 rounded-full bg-[#FF004F25]">
                    </div>
                    <div className="">
                        <div className="text-4xl font-medium">16</div>
                        <div className="text-xl text-[#ffffff50]">Deepfakes Detected</div>
                    </div>
                </div>
            </div>

            <div className="flex items-start justify-center gap-4 mt-8 w-full">
                <div className="w-[40%]">
                    <div className="flex justify-between">
                        <div className="text-3xl font-semibold">Recents</div>
                        <div className="text-[#ffffff50]"><u>View All</u></div>
                    </div>
                    <div className="mt-2 h-16 bg-[#252525] rounded-[10px]"></div>
                </div>

                <div className="w-[23%] py-6 px-6 rounded-[10px] bg-[#252525] flex bg-[url('/dashboardAsset.png')] bg-no-repeat bg-right">
                    <div>
                        <div className="text-[#ffffff50]">API for <br/>
                        businesses</div>
                        <div className="text-wrap w-[75%] text-2xl">Empower Your Business with <b>Seamless Deepfake Detection</b> – Use our <b>API Services</b> Today!</div>
                        <button className="px-6 py-2 bg-[#f1f3f5] text-[#1e1e1e] rounded-full font-semibold text-xl mt-6 flex gap-4 items-center">
                            Explore API Integration 
                        </button>
                    </div>
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
