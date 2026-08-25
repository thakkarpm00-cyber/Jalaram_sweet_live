import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const EditProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(`http://localhost:5546/api/update/${id}`);
        const data = await res.json();
        if (data.success && data.user) {
          setFormData({
            firstName: data.user.firstName || "",
            lastName: data.user.lastName || "",
            street: data.user.street || "",
            city: data.user.city || "",
            pincode: data.user.pincode || "",
          });
        } else {
          toast.error("Failed to load user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Error fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserData();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`http://localhost:5546/api/update/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Profile updated successfully!");
        setTimeout(() => navigate(`/dashboard/${id}`), 2000);
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Something went wrong!");
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-5 text-gray-800">
        Edit Profile
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Row */}
        <div className="flex flex-col gap-4 md:flex-row">
          <label className="flex flex-col flex-1 font-medium text-gray-700 text-sm">
            First Name:
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
            />
          </label>

          <label className="flex flex-col flex-1 font-medium text-gray-700 text-sm">
            Last Name:
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
            />
          </label>
        </div>

        {/* Street */}
        <label className="flex flex-col font-medium text-gray-700 text-sm">
          Street:
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            className="mt-1 p-2 border border-gray-300 rounded-lg 
                     focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
          />
        </label>

        {/* City + Pincode */}
        <div className="flex flex-col gap-4 md:flex-row">
          <label className="flex flex-col flex-1 font-medium text-gray-700 text-sm">
            City:
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
            />
          </label>

          <label className="flex flex-col flex-1 font-medium text-gray-700 text-sm">
            Pincode:
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              className="mt-1 p-2 border border-gray-300 rounded-lg 
                       focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
            />
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-2 bg-orange-500 text-white font-semibold 
                   rounded-lg py-2.5 hover:bg-orange-600 transition duration-300"
        >
          Save Changes
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};
