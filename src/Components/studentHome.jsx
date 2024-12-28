import axios from "axios";
import React, { useEffect, useState } from "react";

export default function StudentHome({ id, institutionId }) {
  const [fundraisers, setFundraisers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    const fetchFundraisers = async () => {
      try {
        console.log("Institute ID:", institutionId);
        const response = await axios.get(
          "http://localhost:5000/getActiveFundRaisers",
          {
            params: { institutionId: institutionId },
          }
        );
        setFundraisers(response.data);
        setIsLoading(false);
      } catch (err) {
        console.error("Error fetching fundraisers:", err);
      }
    };

    const fetchReviews = async () => {
      try {
        //   console.log("Institute ID:", institutionId);/
        const response = await axios.get(
          "http://localhost:5000/getInstituteReviews",
          {
            params: { institutionId: institutionId },
          }
        );
        setReviews(response.data);
        setReviewsLoading(false);
      } catch (err) {
        console.error("Error fetching reviews:", err);
      }
    };
    fetchFundraisers();
    fetchReviews();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const req = {
        institutionId: institutionId,
        ...newReview,
        userId: id,
      };
      await axios.post("http://localhost:5000/postReview", req);
      alert("Review posted successfully.");
      window.location.reload(); // Refresh to fetch updated fundraisers
    } catch (error) {
      console.error("Error posting review:", error);
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
                <div className="text-lg">
                  <a href={`/fundraiser/${fundraiser._id}`}>View Details</a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Get Institute Reviews */}
      <div className="">
        <div className="text-2xl font-bold mb-6" style={{ color: "#220000" }}>
          Your Institute Reviews
        </div>
        <div className="text-lg mb-6" style={{ color: "#220000" }}>
          The reviews are kept anomynous to protect the privacy of the users.
        </div>

        {reviews.length === 0 ? (
          <div>No reviews available yet</div>
        ) : (
          <div className="flex flex-wrap gap-4">
            {reviews.map((review) => (
              <div
                key={review._id}
                className="flex flex-col gap-2 border border-3 p-4 rounded-md border-black"
              >
                <div className="text-xl font-semibold">{review.title}</div>
                <div className="text-lg">{review.content}</div>
                {/* <div className="text-lg">
                  <a href={`/review/${review._id}`}>View Details</a>
                </div> */}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Posting a review */}
      <div>
        <div className="text-2xl font-bold mb-6">Post a Review</div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded-md"
            value={newReview.title}
            onChange={handleChange}
            name="title"
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded-md"
            value={newReview.content}
            onChange={handleChange}
            name="content"
          />
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Post Review
          </button>
        </form>
      </div>
    </div>
  );
}
