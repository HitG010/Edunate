import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div className="flex justify-around p-8 items-center w-[60%] fixed top-0 z-50 text-[#220000]">
      <Link href="/institutions">Institutions</Link>
      <Link href="/Donation Pools">Donation Pools</Link>
      <Link href="/home" className="font-bold text-2xl">Edunate</Link>
      <Link href="/login">Log In</Link>
      <button className="bg-[#220000] text-white py-2 px-8 rounded-lg font-bold">
        <Link href="/signup">Sign Up</Link>
      </button>
    </div>
  );
}
