import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const ProtectedRoute = ({ children }) => {
  // const user = JSON.parse(sessionStorage.getItem("user"));
  const user = useSelector((state) => state.user?.userInfo?.id);
  // console.log(user, "retdtg");
  if (!user) {
    return <Navigate to="/myaccount" replace />;
  }

  return children;
};
