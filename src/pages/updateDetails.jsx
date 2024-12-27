import axios from "axios";
import { getUserDetails } from "../APIs/userDetails";
import { useState } from "react";
export default function UpdateDetails() {
  const [details, setDetails] = useState({
    student: {
      institute: "",
    },
    alumni: {
      institute: "",
    },
    institution: {
      name: "",
      address: "",
      verificationDocument: "",
    },
  });

  const role = localStorage.getItem("role");
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(name);
    console.log(value);
    setDetails((prevDetails) => ({
      ...prevDetails,
      [role]: {
        ...prevDetails[role],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async () => {
    try {
      const user = await getUserDetails();
      const req = { role: role, details: details, user: user };
      axios.post("http://localhost:5000/updateDetails", req).then((res) => {
        console.log(res.data);
      });
      alert("Details updated successfully.");
      window.location.href = "/home";
    } catch (error) {
      console.error("Error updating details:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6" style={{ color: "#220000" }}>
          Update Details
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {role === "student" && (
            <input
              type="institute"
              name="institute"
              placeholder="Institute"
              value={details.student.institute}
              onChange={handleChange}
              className="w-full py-2 px-4 rounded-md mb-2"
            />
          )}
          {role === "alumni" && (
            <input
              type="institute"
              name="institute"
              placeholder="Institute"
              value={details.alumni.institute}
              onChange={handleChange}
              className="w-full py-2 px-4 rounded-md mb-2"
            />
          )}
          {role === "institution" && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Institute Name"
                value={details.institution.name}
                onChange={handleChange}
                className="w-full py-2 px-4 rounded-md mb-2"
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={details.institution.address}
                onChange={handleChange}
                className="w-full py-2 px-4 rounded-md mb-2"
              />
              <input
                type="url"
                name="verificationDocument"
                placeholder="Verification Document URL"
                value={details.institution.verificationDocument}
                onChange={handleChange}
                className="w-full py-2 px-4 rounded-md mb-2"
              />
            </>
          )}
          <button
            type="submit"
            className="w-full py-2 rounded-md text-[#f0f0f0] bg-[#220000] hover:bg-[#22000095] transition mb-2"
          >
            Update Details
          </button>
        </form>
      </div>
    </div>
  );
}
