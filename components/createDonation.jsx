import { useState } from "react";
import axios from "axios";

const CreateDonationForm = () => {
  const [donorName, setDonorName] = useState("");
  const [foodType, setFoodType] = useState("");
  const [quantity, setQuantity] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!donorName.trim()) newErrors.donorName = "Donor name is required";
    if (!foodType.trim()) newErrors.foodType = "Food type is required";
    if (!quantity || quantity <= 0) newErrors.quantity = "Quantity must be a positive number";
    if (!city.trim()) newErrors.city = "City is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setMessage("");
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        "/api/donations/create",
        { donorName, foodType, quantity, city },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      setMessage("✅ Donation created successfully! ID: " + response.data.donationId);
      setDonorName("");
      setFoodType("");
      setQuantity("");
      setCity("");
      setErrors({});
    } catch (err) {
      console.error(err);
      setMessage("❌ Error creating donation: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto">
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Donor Name Field */}
        <div className="relative">
          <label htmlFor="donorName" className="block text-sm font-medium text-stone-700 mb-2">
            Donor Name
          </label>
          <input
            id="donorName"
            type="text"
            placeholder="Enter your name"
            value={donorName}
            onChange={(e) => setDonorName(e.target.value)}
            className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all duration-200 bg-white ${
              errors.donorName ? "border-red-400 bg-red-50" : "border-stone-300 hover:border-stone-400"
            }`}
            aria-describedby={errors.donorName ? "donorName-error" : undefined}
          />
          {errors.donorName && (
            <p id="donorName-error" className="text-red-600 text-xs mt-1.5">
              {errors.donorName}
            </p>
          )}
        </div>

        {/* Food Type Field */}
        <div className="relative">
          <label htmlFor="foodType" className="block text-sm font-medium text-stone-700 mb-2">
            Food Type
          </label>
          <input
            id="foodType"
            type="text"
            placeholder="e.g., Vegetables, Fruits, Cooked Meals"
            value={foodType}
            onChange={(e) => setFoodType(e.target.value)}
            className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all duration-200 bg-white ${
              errors.foodType ? "border-red-400 bg-red-50" : "border-stone-300 hover:border-stone-400"
            }`}
            aria-describedby={errors.foodType ? "foodType-error" : undefined}
          />
          {errors.foodType && (
            <p id="foodType-error" className="text-red-600 text-xs mt-1.5">
              {errors.foodType}
            </p>
          )}
        </div>

        {/* Quantity Field */}
        <div className="relative">
          <label htmlFor="quantity" className="block text-sm font-medium text-stone-700 mb-2">
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            placeholder="Enter quantity (e.g., 5 kg)"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            min="1"
            className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all duration-200 bg-white ${
              errors.quantity ? "border-red-400 bg-red-50" : "border-stone-300 hover:border-stone-400"
            }`}
            aria-describedby={errors.quantity ? "quantity-error" : undefined}
          />
          {errors.quantity && (
            <p id="quantity-error" className="text-red-600 text-xs mt-1.5">
              {errors.quantity}
            </p>
          )}
        </div>

        {/* City Field */}
        <div className="relative">
          <label htmlFor="city" className="block text-sm font-medium text-stone-700 mb-2">
            City
          </label>
          <input
            id="city"
            type="text"
            placeholder="Enter your city"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            className={`w-full px-4 py-3 border rounded-md focus:ring-2 focus:ring-stone-400 focus:border-stone-400 transition-all duration-200 bg-white ${
              errors.city ? "border-red-400 bg-red-50" : "border-stone-300 hover:border-stone-400"
            }`}
            aria-describedby={errors.city ? "city-error" : undefined}
          />
          {errors.city && (
            <p id="city-error" className="text-red-600 text-xs mt-1.5">
              {errors.city}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-6 rounded-md font-semibold transition-all duration-200 ${
            loading
              ? "bg-stone-300 cursor-not-allowed text-stone-500"
              : "bg-stone-800 hover:bg-stone-900 text-white shadow-sm hover:shadow-md"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Creating Donation...
            </span>
          ) : (
            "Submit Donation"
          )}
        </button>
      </form>

      {/* Success/Error Message */}
      {message && (
        <div className={`mt-6 p-4 rounded-md text-sm font-medium border animate-fade-in ${
          message.startsWith("✅")
            ? "bg-stone-50 text-stone-800 border-stone-300"
            : "bg-red-50 text-red-800 border-red-300"
        }`}>
          <p>{message.replace(/^[✅❌]\s*/, "")}</p>
        </div>
      )}
    </div>
  );
};

export default CreateDonationForm;
