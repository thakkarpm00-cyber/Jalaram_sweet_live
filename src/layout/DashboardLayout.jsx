import { Sidebar } from "../components/Sidebar";
import { Outlet } from "react-router-dom";

export const DashboardLayout = () => {
  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main
        className="
          flex-1 md:ml-1
          flex justify-center items-center
          p-6 md:p-10
          bg-white
          min-h-[calc(100vh-6rem)]
        "
      >
        <div className="w-full max-w-3xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
