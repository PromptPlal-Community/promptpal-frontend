import React, { useState } from "react";
import {
  FaSearch,
  FaPlus,
  FaBook,
  FaHeart,
  FaFolderOpen,
  FaHome,
  FaUserCircle,
  FaRegEye,
  FaStar,
} from "react-icons/fa";
import { Clock } from "lucide-react";

function DbWorkspace() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 font-sans mt-17">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex w-64 bg-white shadow-md flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 px-6 py-4 border-b">
            <FaHome className="text-[#270450] text-xl" />
            <span className="text-lg font-bold text-gray-800">PromptPal</span>
          </div>

          {/* Navigation */}
          <nav className="mt-6 flex flex-col">
            <button className="flex items-center gap-3 px-6 py-3 text-[#270450] font-medium bg-purple-100 rounded-r-full">
              <FaHome /> Workspace
            </button>
            <button className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-100">
              <FaBook /> Library
            </button>
            <button className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-100">
              <FaFolderOpen /> Created Prompts
            </button>
            <button className="flex items-center gap-3 px-6 py-3 text-gray-600 hover:bg-gray-100">
              <FaHeart /> Favorites
            </button>
          </nav>
        </div>

        {/* Profile */}
        <div className="flex items-center gap-3 px-6 py-4 border-t">
          <FaUserCircle className="text-3xl text-gray-500" />
          <div>
            <p className="font-medium text-sm">Oluwaseun Adetayo</p>
            <p className="text-xs text-gray-500">oluwa****@gmail.com</p>
          </div>
        </div>
      </aside>

      {/* side bar for Mobile */}
      <div className="flex lg:hidden justify-around items-center bg-white shadow px-4 py-2">
        {[
          { name: "Workspace", icon: <FaHome />, key: "workspace" },
          { name: "Library", icon: <FaBook />, key: "library" },
          { name: "Created Prompts", icon: <FaFolderOpen />, key: "created" },
          { name: "Favorites", icon: <FaHeart />, key: "favorites" },
        ].map((item) => (
          <div
            key={item.key}
            className="relative flex flex-col items-center"
            onMouseEnter={() => setHovered(item.key)}
            onMouseLeave={() => setHovered(null)}
          >
            <button className="text-gray-600 text-xl hover:text-[#270450]">
              {item.icon}
            </button>
            {hovered === item.key && (
              <span className="absolute top-10 bg-gray-800 text-white text-xs px-2 py-1 rounded">
                {item.name}
              </span>
            )}
          </div>
        ))}
        <div className="flex items-center">
          <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#270450] text-white font-bold">
            OA
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 lg:p-6">
        {/* search bar */}
        <form>
          <div className="flex flex-col lg:flex-row items-center justify-between mb-6 gap-3">
            <div className="relative w-full lg:w-1/3">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Find Prompts"
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
              />
            </div>
            <button className="flex items-center gap-2 bg-[#270450] hover:bg-[#270450]/80 text-white px-4 py-2 rounded-lg">
              <FaPlus /> Create prompt
            </button>
          </div>
        </form>

        <h1 className="text-xl font-bold text-gray-800 mb-2">My Workspace</h1>
        <p className="text-gray-500 mb-6">
          Your personalized hub for creation and management. Access, organize,
          and track all your projects and ideas from one central control panel.
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {/* created prompts */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Created Prompts</p>

              <FaBook size={12} color="#270450" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-3">12</h2>
            <span className="text-xs text-[#270450]/70">+3 this week</span>
          </div>

          {/* total views */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Total Views</p>

              <FaRegEye size={15} color="#270450" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-3">1256</h2>
            <span className="text-xs text-[#270450]/70">+12% this month</span>
          </div>

          {/* favorites */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Favorites</p>

              <FaHeart size={12} color="#270450" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-3">24</h2>
            <span className="text-xs text-[#270450]/70">+5 this month</span>
          </div>

          {/* ratings */}
          <div className="bg-white shadow rounded-lg p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-500">Average Ratings</p>

              <FaStar size={12} color="#270450" />
            </div>

            <h2 className="text-2xl font-bold text-gray-800 mt-3">4.8</h2>
            <span className="text-xs text-[#270450]/70">+20% this month</span>
          </div>
        </div>

        {/* Recent Prompts */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <h2 className="text-lg font-bold text-gray-700 mb-3">
              Recent Prompts
            </h2>

            {/* Prompt Card */}
            <div className="space-y-4">
              {/* card 1(coding) */}
              <div className="bg-white p-4 shadow rounded-lg border-l-4 border-purple-400 relative">
                <span
                  className="text-xs bg-purple-100
                text-[#270450] px-2 py-1 rounded"
                >
                  Coding
                </span>
                <h3 className="font-semibold mt-2">
                  React Component Documentation
                </h3>
                <p className="text-sm text-gray-500 flex items-center gap-4 mt-1">
                  <div className="flex items-center justify gap-1">
                    <FaRegEye /> <span>890</span>
                  </div>

                  <div className="flex items-center justify gap-1">
                    <FaHeart /> <span>12</span>
                  </div>

                  <div className="flex items-center justify gap-1">
                    {" "}
                    <Clock size={18} /> <span>3 days ago</span>
                  </div>
                </p>
                <span className="absolute right-4 top-4 text-xs bg-[#270450] text-white px-2 py-1 rounded">
                  Published
                </span>
              </div>

              {/* card 2(design) */}
              <div className="bg-white p-4 shadow rounded-lg border-l-4 border-yellow-400 relative">
                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">
                  Design
                </span>
                <h3 className="font-semibold mt-2">UI/UX Design Critique</h3>
                <p className="text-sm text-gray-500 flex items-center gap-4 mt-1">
                  <div className="flex items-center justify gap-1">
                    <FaRegEye /> <span>890</span>
                  </div>

                  <div className="flex items-center justify gap-1">
                    <FaHeart /> <span>12</span>
                  </div>

                  <div className="flex items-center justify gap-1">
                    {" "}
                    <Clock size={18} /> <span>3 days ago</span>
                  </div>
                </p>
                <span className="absolute right-4 top-4 text-xs bg-gray-300 text-gray-700 px-2 py-1 rounded">
                  Draft
                </span>
              </div>

              {/* card 3(writing) */}
              <div className="bg-white p-4 shadow rounded-lg border-l-4 border-blue-400 relative">
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                  Writing
                </span>
                <h3 className="font-semibold mt-2">Creative Writing Sparks</h3>
                <p className="text-sm text-gray-500 flex items-center gap-4 mt-1">
                  <div className="flex items-center justify gap-1">
                    <FaRegEye /> <span>890</span>
                  </div>

                  <div className="flex items-center justify gap-1">
                    <FaHeart /> <span>12</span>
                  </div>

                  <div className="flex items-center justify gap-1">
                    {" "}
                    <Clock size={18} /> <span>3 days ago</span>
                  </div>
                </p>
                <span className="absolute right-4 top-4 text-xs bg-[#270450] text-white px-2 py-1 rounded">
                  Published
                </span>
              </div>
            </div>

            <button className="mt-4 w-full py-2 bg-[#270450] text-white rounded-lg hover:bg-[#270450]/80">
              View all prompts
            </button>
          </div>

          {/* Quick Actions */}
          <div>
            <h2 className="text-lg font-bold text-gray-700 mb-3">
              Quick Actions
            </h2>
            <div className="space-y-3">
              <button className="w-full flex items-center gap-3 px-4 py-2 bg-black text-white rounded-lg">
                <FaPlus /> Create New Prompts
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 border rounded-lg">
                <FaBook /> Browse Library
              </button>
              <button className="w-full flex items-center gap-3 px-4 py-2 border rounded-lg">
                <FaHome /> Community Feeds
              </button>
            </div>

            <h3 className="mt-6 font-semibold text-gray-700">
              Popular Categories
            </h3>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 bg-purple-100 text-[#270450] rounded-full text-xs">
                Coding
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                Design
              </span>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">
                Writing
              </span>
              <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-full text-xs">
                Marketing
              </span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default DbWorkspace;
