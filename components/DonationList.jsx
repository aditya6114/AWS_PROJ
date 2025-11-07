import React, { useEffect, useState } from "react";
import axios from "axios";

const DonationList = () => {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Replace these with your actual API endpoints
  const LIST_DONATIONS_URL = "/api/donations/list";
  const UPDATE_DONATION_URL = "https://4v4l0kxc90.execute-api.ap-south-1.amazonaws.com/donations";

  // Fetch all donations
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(LIST_DONATIONS_URL, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = typeof res.data === "string" ? JSON.parse(res.data) : res.data; // ✅ safe
        setDonations(data);

      } catch (err) {
        console.error("Error fetching donations:", err);
        setError("Failed to fetch donations.");
      } finally {
        setLoading(false);
      }
    };
    fetchDonations();
  }, []);

  // Update donation status
  const handleUpdateStatus = async (donationId, newStatus) => {
    try {
      const res = await axios.put(UPDATE_DONATION_URL, {
        donationId,
        status: newStatus,
      });
      console.log(res.data);
      alert(`Donation ${donationId} updated to ${newStatus}`);
      setDonations((prev) =>
        prev.map((d) =>
          d.donationId === donationId ? { ...d, status: newStatus } : d
        )
      );
    } catch (err) {
      console.error("Error updating donation:", err);
      alert("Failed to update donation status");
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <svg className="animate-spin h-10 w-10 text-stone-600 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-stone-600 font-medium">Loading donations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-300 rounded-md p-6 text-center">
        <p className="text-red-700 font-medium">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      {donations.length === 0 ? (
        <div className="text-center py-12 bg-stone-50 rounded-md border border-dashed border-stone-300">
          <p className="text-stone-600 font-medium">No donations found.</p>
          <p className="text-stone-500 text-sm mt-2">Be the first to make a donation!</p>
        </div>
      ) : (
        <div className="space-y-3 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {donations.map((donation) => (
            <div
              key={donation.donationId}
              className="bg-white rounded-md border border-stone-200 p-4 hover:shadow-sm transition-all duration-200 hover:border-stone-400"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Donation Info */}
                <div className="flex-1 space-y-3">
                  <div>
                    <p className="text-xs text-stone-500 font-medium mb-1">Donor</p>
                    <p className="text-base font-semibold text-stone-800">{donation.donorName}</p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-stone-500 font-medium mb-1">Food Type</p>
                      <p className="text-sm font-medium text-stone-700">{donation.foodType}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-stone-500 font-medium mb-1">Quantity</p>
                      <p className="text-sm font-medium text-stone-700">{donation.quantity}</p>
                    </div>
                    
                    <div>
                      <p className="text-xs text-stone-500 font-medium mb-1">City</p>
                      <p className="text-sm font-medium text-stone-700">{donation.city || 'Not specified'}</p>
                    </div>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex flex-col items-start md:items-end gap-3">
                  <span className="px-3 py-1 rounded-md text-xs font-semibold bg-stone-100 text-stone-700 border border-stone-300">
                    {donation.status?.toUpperCase() || 'PENDING'}
                  </span>
                  
                  <div className="flex flex-wrap gap-2">
                    {donation.status !== "claimed" && (
                      <button
                        onClick={() => handleUpdateStatus(donation.donationId, "claimed")}
                        className="bg-stone-700 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-stone-800 transition-all duration-200 shadow-sm"
                      >
                        Mark Claimed
                      </button>
                    )}
                    {donation.status !== "completed" && (
                      <button
                        onClick={() => handleUpdateStatus(donation.donationId, "completed")}
                        className="bg-stone-800 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-stone-900 transition-all duration-200 shadow-sm"
                      >
                        Mark Completed
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DonationList;
