import axios from "axios";
import React, { useEffect, useState } from "react";
import Navbar from "../Components/nav";
export default function Admin() {
  const [payments, setPayments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      axios
        .get("http://localhost:5000/getPayments")
        .then((response) => {
          setPayments(response.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching payments:", err);
        });
    };
    fetchPayments();
  }, []);

  const PaymentClick = (paymentInfo) => {
    console.log(paymentInfo);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Payments</h1>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Payment ID</th>
              <th className="py-2 px-4 border-b">Amount</th>
              <th className="py-2 px-4 border-b">Payment For</th>
              <th className="py-2 px-4 border-b">Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {payments.map((payment) => (
              <tr
                key={payment._id}
                onClick={() => PaymentClick(payment)}
                className="hover:bg-gray-100 cursor-pointer"
              >
                <td className="py-2 px-4 border-b">{payment._id}</td>
                <td className="py-2 px-4 border-b">{payment.amount}</td>
                <td className="py-2 px-4 border-b">
                  {payment.recieverAddress}
                </td>
                <td
                  className="py-2 px-4 border-b"
                  style={{
                    backgroundColor:
                      payment.status === "Approved" ? "lightgreen" : "pink",
                  }}
                >
                  {payment.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
