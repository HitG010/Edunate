import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

export default function Fundraiser() {
  const id = useParams().id;
  const [fundraiser, setFundraiser] = useState(null);
  const [milestones, setMilestones] = useState([]);

  useEffect(() => {
    console.log("Fundraiser ID:", id);
    const fetchFundraiser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getFundraiser/${id}`
        );
        console.log("Fundraiser:", response.data);
        setFundraiser(response.data);
      } catch (err) {
        console.error("Error fetching fundraiser:", err);
      }
    };
    fetchFundraiser();
  }, []);

  // get the milestone details
  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getMilestones/${id}`
        );
        console.log("Milestones:", response.data);
        setMilestones(response.data);
      } catch (err) {
        console.error("Error fetching milestones:", err);
      }
    };
    fetchMilestones();
  }, [fundraiser]);

  if (!fundraiser) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="fundraiser-container p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold">{fundraiser.title}</h1>
        <p className="text-gray-700">{fundraiser.description}</p>
        <p className="text-gray-900">Goal: ${fundraiser.goalAmount}</p>
        <p className="text-gray-900">Raised: ${fundraiser.currentAmount}</p>
        <p className="text-gray-900">Status: {fundraiser.status}</p>
      </div>
      {/* print milestones */}
      <div className="milestones-container p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold">Milestones</h1>
        {milestones.length === 0 ? (
          <div>No milestones available yet</div>
        ) : (
          milestones.map((milestone) => (
            <div
              key={milestone._id}
              className="flex flex-col gap-2 border border-3 p-4 rounded-md border-black"
            >
              <div className="text-xl font-semibold">{milestone.title}</div>
              <div className="text-lg">{milestone.description}</div>
              <div className="text-lg">Amount: ${milestone.targetAmount}</div>
              {milestone.status ? (
                <div className="text-lg">Status : Completed</div>
              ) : (
                <div className="text-lg">Status : Not Yet</div>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
