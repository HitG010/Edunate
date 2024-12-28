import axios from "axios";
import React, { useEffect, useState } from "react";

export default function InstituteHome({ id }) {
  const [fundraisers, setFundraisers] = useState([]);
  const [pastFundraisers, setPastFundraisers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newFundraiser, setNewFundraiser] = useState({
    title: "",
    description: "",
    goalAmount: 0,
    currentAmount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewFundraiser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        console.log("Institute ID:", id);
        const response = await axios.get(
          "http://localhost:5000/getActiveFundRaisers",
          {
            params: { institutionId: id },
          }
        );
        setFundraisers(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching fundraisers:", err);
      }
    };

    const fetchPastFundraisers = async () => {
      try {
        console.log("Institute ID:", id);
        const response = await axios.get(
          "http://localhost:5000/getPastFundRaisers",
          {
            params: { institutionId: id },
          }
        );
        setPastFundraisers(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching fundraisers:", err);
      }
    };
    fetchFundraisers();
    fetchPastFundraisers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = { institutionId: id, ...newFundraiser, status: "Active" };
      await axios.post("http://localhost:5000/createFundraiser", req);
      alert("Fundraiser created successfully.");
      window.location.reload(); // Refresh to fetch updated fundraisers
    } catch (error) {
      console.error("Error creating fundraiser:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>
        <div className="text-2xl font-bold mb-6" style={{ color: "#220000" }}>
          Current Fundraisers
        </div>
        {fundraisers.length === 0 ? (
          <div>No fundraisers available yet</div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {fundraisers.map((fundraiser) => (
              <div
                key={fundraiser._id}
                className="flex flex-col gap-2 border border-3 p-4 rounded-md border-black"
              >
                <div className="text-xl font-semibold">{fundraiser.title}</div>
                <div className="text-lg">{fundraiser.description}</div>
                <div className="text-lg">Goal: {fundraiser.goalAmount}</div>
                <div className="text-lg">
                  Raised: {fundraiser.currentAmount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Create Fundraisers */}
      <div>
        <div
          className="text-2xl font-bold mb-6"
          stFundraiseryle={{ color: "#220000" }}
        >
          Create Fundraiser
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded-md"
            value={newFundraiser.title}
            onChange={handleChange}
            name="title"
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded-md"
            value={newFundraiser.description}
            onChange={handleChange}
            name="description"
          />
          <input
            type="number"
            placeholder="Goal Amount ($EDU)"
            className="border p-2 rounded-md"
            value={newFundraiser.goalAmount}
            onChange={handleChange}
            name="goalAmount"
          />
          <button
            type="submit"
            className="bg-[#220000] text-[#f0f0f0] py-2 px-4 rounded-md"
          >
            Create Fundraiser
          </button>
        </form>
      </div>
      {/* Past fundraisers */}
      <div>
        <div className="text-2xl font-bold mb-6" style={{ color: "#220000" }}>
          Past Fundraisers
        </div>
        {pastFundraisers.length === 0 ? (
          <div>No fundraisers available yet</div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {pastFundraisers.map((fundraiser) => (
              <div
                key={fundraiser._id}
                className="flex flex-col gap-2 border border-3 p-4 rounded-md border-black"
              >
                <div className="text-xl font-semibold">{fundraiser.title}</div>
                <div className="text-lg">{fundraiser.description}</div>
                <div className="text-lg">Goal: {fundraiser.goalAmount}</div>
                <div className="text-lg">
                  Raised: {fundraiser.currentAmount}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
