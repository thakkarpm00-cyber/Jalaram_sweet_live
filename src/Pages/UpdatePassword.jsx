import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const UpdatePassword = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match!");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(`http://localhost:5546/api/update_pass/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Password updated successfully!");
        setTimeout(() => navigate(`/myaccount`), 2000);
      } else {
        toast.error(data.message || "Failed to update password");
      }
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-semibold text-center mb-5 text-gray-800">
        Update Password
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Current Password */}
        <label className="flex flex-col font-medium text-gray-700">
          Current Password:
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
          />
        </label>

        {/* New Password */}
        <label className="flex flex-col font-medium text-gray-700">
          New Password:
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
          />
        </label>

        {/* Confirm Password */}
        <label className="flex flex-col font-medium text-gray-700">
          Confirm Password:
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="mt-1 p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-400 focus:outline-none text-sm"
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-2 font-semibold rounded-lg py-2.5 transition duration-300 ${
            loading
              ? "bg-orange-300 text-white cursor-not-allowed"
              : "bg-orange-500 text-white hover:bg-orange-600"
          }`}
        >
          {loading ? "Updating..." : "Update Password"}
        </button>
      </form>

      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
};
