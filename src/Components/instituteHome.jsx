import axios from "axios";
import React, { useEffect, useState } from "react";
import { connectMetamask, createFundraiser, getContract } from "../APIs/blockchain";

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
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let fundraiserId = "";
      const req = { institutionId: id, ...newFundraiser, status: "Active" };

      const result = await axios.post("http://localhost:5000/createFundraiser", req).then(async (res) => {
        console.log("Fundraiser created successfully:", res.data.fundraiser._id);
        fundraiserId = res.data.fundraiser._id;

        let milestones = [];
        let milestoneDescs = [];
        let milestoneAmts = [];
        await axios
          .get(`http://localhost:5000/getMilestones/${fundraiserId}`)
          .then((res) => {
            milestones = res.data.milestones;
            milestones.forEach((milestone) => {
              milestoneDescs.push(milestone.description);
              milestoneAmts.push(milestone.targetAmount);
            });
          })
          .catch((err) => {
            console.error("Error fetching milestones:", err);
          });

        // Create fundraiser on the blockchain
        console.log("Creating fundraiser on the blockchain...");
        connectMetamask();
        const contract = getContract();
        const tx = await createFundraiser(
          contract,
          fundraiserId,
          newFundraiser.title,
          newFundraiser.goalAmount,
          milestoneDescs,
          milestoneAmts
        );

        alert("Fundraiser created successfully.");
        // window.location.reload(); // Refresh to fetch updated fundraisers
      });
    } catch (error) {
      console.error("Error creating fundraiser:", error);
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Current Fundraisers */}
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
                <div className="text-lg">Raised: {fundraiser.currentAmount}</div>
                <div className="text-lg">
                  <a href={`/fundraiser/${fundraiser._id}`}>View Details</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Fundraiser */}
      <div>
        <div className="text-2xl font-bold mb-6">Create Fundraiser</div>
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

      {/* Past Fundraisers */}
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
                <div className="text-lg">Raised: {fundraiser.currentAmount}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
