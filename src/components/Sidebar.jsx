import React from "react";
import { useNavigate, useParams, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import { logout } from "../redux/userSlice";
import { persistor } from "../redux/store";

export const Sidebar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.userInfo);
  const localUser = JSON.parse(localStorage.getItem("user"));
  const currentUser = user || localUser;

  const handleLogout = () => {
    if (currentUser?.id) {
      localStorage.removeItem(`cart_${currentUser.id}`);
      Cookies.remove(`cart_${currentUser.id}`);
    }

    localStorage.removeItem("user");
    localStorage.clear();
    dispatch(logout());
    persistor.purge();
    navigate("/myaccount", { replace: true });
  };

  const firstName = currentUser?.firstName || "User";

  return (
    <aside
      className="
        w-64 bg-gray-100 border-r border-gray-300 
        h-[calc(100vh-13rem)] relative top-[6rem] left-0 
         z-10 p-6
        hidden md:block
      "
    >
      {/* Profile Section */}
      <div className="text-center mb-8">
        <div className="text-5xl mb-3">👤</div>
        <p className="text-gray-700 text-lg">
          Hello <strong className="font-semibold">{firstName}</strong>
        </p>
      </div>

      {/* Sidebar Links */}
      <ul className="space-y-2">
        <li>
          <NavLink
            to={`/dashboard/${id}`}
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded-lg transition duration-200 text-base font-medium ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            📊 Dashboard
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`/orders_detail/${id}`}
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded-lg transition duration-200 text-base font-medium ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            🛒 Orders
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`/editprofile/${id}`}
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded-lg transition duration-200 text-base font-medium ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            ✏️ Edit Profile
          </NavLink>
        </li>

        <li>
          <NavLink
            to={`/UpdatePassword/${id}`}
            className={({ isActive }) =>
              `block py-2.5 px-4 rounded-lg transition duration-200 text-base font-medium ${
                isActive
                  ? "bg-red-600 text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`
            }
          >
            🔒 Update Password
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};
