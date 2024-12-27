import React, { useState } from "react";
import axios from "axios";

export default function UploadInvoice() {
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
      const response = await axios.post(
        "http://localhost:3000/upload-invoice",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(response);
      setResponseData(response.data.invoice_data);
    } catch (error) {
      setError("Failed to upload the file or process the invoice.");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto", padding: "20px" }}>
      <h1>Invoice Upload</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".pdf" onChange={handleFileChange} />
        <button type="submit">Upload Invoice</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {responseData && (
        <div style={{ marginTop: "20px" }}>
          <h2>Extracted Invoice Data:</h2>
          <pre>{JSON.stringify(responseData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
