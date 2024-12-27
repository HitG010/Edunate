import axios from "axios";
import React, { useEffect, useState } from "react";

export default function InstituteHome({ id }) {
  const [fundraisers, setFundraisers] = useState([]);
  const [otherFundraisers, setOtherFundraisers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

    const fetchOtherFundraisers = async () => {
      try {
        console.log("Institute ID:", id);
        const response = await axios.get(
          "http://localhost:5000/getOtherFundraisers",
          {
            params: { institutionId: id },
          }
        );
        setOtherFundraisers(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching fundraisers:", err);
      }
    };
    fetchFundraisers();
    fetchOtherFundraisers();
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
          Your Institute Fundraisers
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

      {/* Other fundraisers */}
      <div>
        <div className="text-2xl font-bold mb-6" style={{ color: "#220000" }}>
          Other Institute Fundraisers
        </div>
        {otherFundraisers.length === 0 ? (
          <div>No fundraisers available yet</div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {otherFundraisers.map((fundraiser) => (
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
