import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
// import e from "express";

export default function Fundraiser({ userId }) {
  const id = useParams().id;
  const [fundraiser, setFundraiser] = useState(null);
  const [milestones, setMilestones] = useState([]);
  const [currentMilestone, setCurrentMilestone] = useState(null);
  // const [instituteId, setInstituteId] = useState(null);

  const role = localStorage.getItem("role");
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
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].onGoing) {
            setCurrentMilestone(response.data[i]);
            break;
          }
        }
      } catch (err) {
        console.error("Error fetching milestones:", err);
      }
    };
    fetchMilestones();
  }, [fundraiser]);

  const [selectedFile, setSelectedFile] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setResponseData(null);
    setError("");

    if (!selectedFile) {
      setError("Please select a file before uploading.");
      return;
    }

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      await axios
        .post("http://localhost:3000/uploadInvoice", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log("Recieved response");
          console.log(response);
          const recieverMetaMask = prompt(
            "Invoice Verified!\nEnter the reciever's MetaMask address"
          );
          const paymentDetails = {
            milestoneId: currentMilestone._id,
            recieverAddress: recieverMetaMask,
            amount: currentMilestone.targetAmount,
          };
          axios
            .post("http://localhost:5000/addPayment", paymentDetails)
            .then((response) => {
              console.log("Payment Successfull");
              alert("Payment Successfull");
            })
            .catch((error) => {
              console.log("Payment Failed");
              setError("Failed to upload the file or process the invoice.");
            });
        })
        .catch((error) => {
          console.log("Error in uploading invoice", error);
          setError("Failed to upload the file or process the invoice.");
        });
    } catch (error) {
      console.log("Error in uploading invoice");
      setError("Failed to upload the file or process the invoice.");
    }
  };

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
              style={{
                backgroundColor: milestone.completed
                  ? "greenyellow"
                  : milestone.onGoing
                  ? "yellow"
                  : "white",
              }}
            >
              <div className="text-xl font-semibold">
                {milestone.index + ". " + milestone.title}
              </div>
              <div className="text-lg">{milestone.description}</div>
              <div className="text-lg">Amount: ${milestone.targetAmount}</div>
              {milestone.status ? (
                <div className="text-lg">Status : Completed</div>
              ) : (
                <div className="text-lg">Status : Not Yet</div>
              )}
              {/* Add a form for invoice upload */}
              {role === "institution" && (
                <form onSubmit={handleSubmit}>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileChange}
                    id={milestone._id}
                  />
                  <button type="submit">Upload Invoice</button>
                </form>
              )}
            </div>
          ))
        )}
      </div>
    </>
  );
}
