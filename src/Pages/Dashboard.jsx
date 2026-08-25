import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const Dashboard = () => {
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const user = useSelector((state) => state.user.userInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem("user"));
    if ((!user && !localUser) || (localUser?.id !== id && user?.id !== id)) {
      navigate("/myaccount", { replace: true });
    }
  }, [id, user, navigate]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch(
          `http://localhost:5546/api/user/dashboard/${id}`
        );
        const data = await res.json();
        if (data.status && data.user) {
          setUserData(data.user);
        } else {
          toast.error("Failed to fetch user data.");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.error("Something went wrong while fetching user data.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchUserData();
    }
  }, [id]);

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-700">
        Loading...
      </div>
    );

  if (!userData)
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-700">
        User not found.
      </div>
    );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 py-10 px-4 md:px-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-6 md:p-10">
        <h2 className="text-center text-3xl font-bold text-gray-800 mb-8">
          Profile Details
        </h2>

        <div className="flex flex-col space-y-6">
          {/* FULL NAME */}
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-lg font-semibold text-gray-800">
              Full Name
            </span>
            <span className="text-lg text-gray-700 text-right break-words max-w-[55%]">
              {userData.firstName} {userData.lastName || ""}
            </span>
          </div>

          {/* PHONE */}
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-lg font-semibold text-gray-800">
              Mobile Number
            </span>
            <span className="text-lg text-gray-700 text-right break-words max-w-[55%]">
              {userData.phone || "- not added -"}
            </span>
          </div>

          {/* EMAIL */}
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-lg font-semibold text-gray-800">
              Email ID
            </span>
            <span className="text-lg text-gray-700 text-right break-words max-w-[55%]">
              {userData.email || "- not added -"}
            </span>
          </div>

          {/* GENDER */}
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-lg font-semibold text-gray-800">Gender</span>
            <span className="text-lg text-gray-700 text-right break-words max-w-[55%]">
              {userData.gender || "- not added -"}
            </span>
          </div>

          {/* ADDRESS */}
          <div className="flex justify-between items-center border-b pb-3">
            <span className="text-lg font-semibold text-gray-800">Address</span>
            <span className="text-lg text-gray-700 text-right break-words max-w-[55%]">
              {userData.street || userData.city || userData.pincode
                ? [userData.street, userData.city]
                    .filter(Boolean)
                    .join(", ")
                    .concat(userData.pincode ? ` - ${userData.pincode}` : "")
                : "- not added -"}
            </span>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={() => navigate(`/editprofile/${id}`)}
          className="mt-10 w-full md:w-1/3 mx-auto block bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold py-3.5 rounded-lg transition duration-300"
        >
          EDIT
        </button>
      </div>
    </div>
  );
};
