import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-around p-8 items-center w-[60%] fixed top-0 z-50 text-[#220000]">
      <a href="/institutions">Institutions</a>
      <a href="/Donation Pools">Donation Pools</a>
      <a href="/home" className="font-bold text-2xl">Edunate</a>
      <a href="/login">Log In</a>
      <button className="bg-[#220000] text-white py-2 px-8 rounded-lg font-bold">
        <a href="/login">Sign Up</a>
      </button>
    </div>
  );
}
