import React from "react";
import { useState } from "react";
import axios from "axios";

const InstituteSignUp = () => {
    const [instituteName, setInstituteName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [verificationDocument, setVerificationDocument] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append("instituteName", instituteName);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("verificationDocument", verificationDocument);

        const sendData = async () => {
            try {
                const response = await axios.post("http://localhost:5000/instituteSignUp", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                alert("Document uploaded successfully! You will be notified once your account is verified.");
            } catch (err) {
                console.error(err);
            }
        }
        sendData();


    };

    return (
        <div className="h-screen flex justify-center items-center gap-36">
            <div className="flex gap-[30px]">
                <div className="text-5xl font-bold">DeepTrace</div>
            </div>
            <div className="bg-[#252525] px-12 py-16 rounded-[20px]">
                <div>
                    <div className="text-sm font-semibold text-[#787878]">Sign Up</div>
                    <div className="text-3xl font-semibold">Welcome!</div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="mt-8">
                        <div className="text-md font-semibold">Institute Name</div>
                        <input
                            type="text"
                            value={instituteName}
                            onChange={(e) => setInstituteName(e.target.value)}
                            className="w-[360px] px-4 py-2.5 rounded-full border border-1 border-[#f1f3f515] text-smd"
                        />
                    </div>

                    <div className="mt-8">
                        <div className="text-md font-semibold">Email</div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-[360px] px-4 py-2.5 rounded-full border border-1 border-[#f1f3f515] text-smd"
                        />
                    </div>

                    <div className="mt-8">
                        <div className="text-md font-semibold">Password</div>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-[360px] px-4 py-2.5 rounded-full border border-1 border-[#f1f3f515] text-smd"
                        />
                    </div>

                    <div className="mt-8">
                        <div className="text-md font-semibold">Confirm Password</div>
                        <input
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-[360px] px-4 py-2.5 rounded-full border border-1 border-[#f1f3f515] text-smd"
                        />
                    </div>

                    <div className="mt-8">
                        <div className="text-md font-semibold">Upload Verification Document</div>
                        <input
                            type="file"
                            className="w-[360px] px-4 py-2.5 rounded-full border border-1 border-[#f1f3f515] text-smd"
                            onChange={(e) => setVerificationDocument(e.target.files[0])}                            
                        />
                    </div>

                    <div className="mt-8">
                        <button
                            type="submit"
                            className="w-[360px] px-4 py-2.5 rounded-full bg-[#f1f3f5] text-md text-gray-900 font-semibold"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default InstituteSignUp;