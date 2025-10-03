import {
  FaHeart,
  FaRegBookmark,
  FaUser,
  FaRegEye,
  FaUsers,
  FaShareAlt,
  FaComment,
} from "react-icons/fa";
import {
  MdWorkspaces,
  MdLibraryBooks,
  MdCreateNewFolder,
  MdStar,
} from "react-icons/md";

function CTrending() {
  const user = { name: "Oluwaseun Adeoye", email: "seun@example.com" };
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50 mt-18">
      {/* Sidebar */}
      <div className="bg-white shadow-md lg:w-64 flex lg:flex-col items-center lg:items-start p-4 gap-6">
        {/* Mobile initials */}
        <div className="lg:hidden flex items-center justify-center bg-[#270450] text-white font-bold rounded-full w-10 h-10">
          {initials}
        </div>

        {/* Menu Buttons */}
        <div className="flex lg:flex-col gap-10">
          <button className="relative group flex flex-col lg:flex-row items-center gap-2 text-gray-700 hover:text-[#270450]">
            <MdWorkspaces size={22} />
            <span className="hidden lg:block">Workspace</span>
            <span className="absolute top-10 lg:hidden bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
              Workspace
            </span>
          </button>
          <button className="relative group flex flex-col lg:flex-row items-center gap-2 text-gray-700 hover:text-[#270450]">
            <MdLibraryBooks size={22} />
            <span className="hidden lg:block">Library</span>
            <span className="absolute top-10 lg:hidden bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
              Library
            </span>
          </button>
          <button className="relative group flex flex-col lg:flex-row items-center gap-2 text-gray-700 hover:text-[#270450]">
            <MdCreateNewFolder size={22} />
            <span className="hidden lg:block">Created Prompts</span>
            <span className="absolute top-10 lg:hidden bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
              Created Prompts
            </span>
          </button>
          <button className="relative group flex flex-col lg:flex-row items-center gap-2 text-gray-700 hover:text-[#270450]">
            <MdStar size={22} />
            <span className="hidden lg:block">Favorites</span>
            <span className="absolute top-10 lg:hidden bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100">
              Favorites
            </span>
          </button>
        </div>

        {/* Desktop full user */}
        <div className="hidden lg:flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#270450] flex items-center justify-center text-white font-bold">
            {initials}
          </div>
          <div>
            <p className="font-semibold">{user.name}</p>
            <p className="text-sm text-gray-500">{user.email}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <input
            type="text"
            placeholder="Find Prompts"
            className="w-full max-w-md p-2 border rounded-lg"
          />
          <button className="bg-[#270450] text-white px-4 py-2 rounded-lg ml-4">
            + Share Prompt
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {/* active users */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full">
              <div className="flex items-center justify-between ">
                <p className="text-sm text-gray-500">Active Users</p>

                <FaUsers size={15} color="#270450" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-3">12.5k</h2>
              <span className="text-xs text-[#270450]/70">
                +8.2% from last week
              </span>
            </div>
          </div>

          {/* prompts shared */}
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="w-full">
              <div className="flex items-center justify-between ">
                <p className="text-sm text-gray-500">Prompts Shared</p>

                <FaShareAlt size={15} color="#270450" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-3">3275</h2>
              <span className="text-xs text-[#270450]/70">
                +12% from last week
              </span>
            </div>
          </div>

          {/* likes */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-2">
            <div className="w-full">
              <div className="flex items-center justify-between ">
                <p className="text-sm text-gray-500">Total Likes</p>

                <FaHeart size={15} color="#270450" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-3">2890</h2>
              <span className="text-xs text-[#270450]/70">
                +15% from last week
              </span>
            </div>
          </div>

          {/* comments */}
          <div className="bg-white p-4 rounded-lg shadow flex items-center gap-2">
            <div className="w-full">
              <div className="flex items-center justify-between ">
                <p className="text-sm text-gray-500">Comments</p>

                <FaComment size={15} color="#270450" />
              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-3">1641</h2>
              <span className="text-xs text-[#270450]/70">
                +20% from last week
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-6">
          <button className="px-4 py-2 rounded-full bg-[#270450] text-white">
            Trending
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-200">Recent</button>
          <button className="px-4 py-2 rounded-full bg-gray-200">
            Most Liked
          </button>
          <button className="px-4 py-2 rounded-full bg-gray-200">
            Following
          </button>
        </div>

        {/* Feed */}
        <div className="space-y-6">
          <h2 className="text-gray-500 font-bold text-xl">Trending Prompts</h2>
          {[1, 2, 3].map((item) => (
            <div key={item} className="bg-white p-4 rounded-lg shadow">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 bg-[#270450] text-white flex items-center justify-center rounded-full font-bold">
                      SJ
                    </div>
                    <div>
                      <p className="font-semibold">Sarah John</p>
                      <p className="text-sm text-gray-500">2 hours ago</p>
                    </div>
                  </div>
                  <h3 className="font-semibold mb-2">React Hook Generator</h3>
                  <p className="text-gray-600 mb-3">
                    Generate custom React hooks with TypeScript support
                  </p>
                </div>

                <FaHeart />
              </div>
              <div className="flex gap-2 mb-3">
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  react
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  documentation
                </span>
                <span className="px-3 py-1 bg-gray-100 rounded-full text-sm">
                  typescript
                </span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex gap-4 text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaRegEye /> 102
                  </span>
                  <span className="flex items-center gap-1">
                    <FaHeart /> 68
                  </span>
                  <span className="flex items-center gap-1">
                    <FaRegBookmark /> 45
                  </span>
                  <span className="flex items-center gap-1">
                    <FaUser /> 12
                  </span>
                </div>
                <button className="px-3 py-1 bg-[#FADC66] rounded text-sm font-semibold">
                  Try Prompt
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center mt-6">
          <button className="px-6 py-2 bg-[#270450] text-white rounded-lg">
            Load more prompt
          </button>
        </div>
      </div>
    </div>
  );
}

export default CTrending;

// import React from "react";
// import {
//   FaRegHeart,
//   FaEye,
//   FaRegCommentDots,
//   FaUser,
//   FaBookmark,
// } from "react-icons/fa";
// import { FiShare } from "react-icons/fi";
// import { MdDashboard } from "react-icons/md";

// function CTrending() {
//   return (
//     <section className="flex min-h-screen bg-gray-50 text-gray-800">
//       {/* Sidebar */}
//       <aside className="bg-white border-r flex flex-col justify-between w-16 md:w-64 transition-all">
//         <div>
//           {/* Logo */}
//           <div className="px-4 md:px-6 py-6 text-xl md:text-2xl font-bold text-purple-800 hidden md:block">
//             PromptPal
//           </div>

//           {/* Nav Buttons */}
//           <nav className="flex flex-col space-y-2 items-center md:items-stretch px-2 md:px-4">
//             <SidebarButton icon={<MdDashboard />} label="Workspace" />
//             <SidebarButton icon={<FaBookmark />} label="Library" />
//             <SidebarButton icon={<FiShare />} label="Created Prompt" />
//             <SidebarButton icon={<FaRegHeart />} label="Favorites" />
//           </nav>
//         </div>

//         {/* User Profile */}
//         <div className="p-2 md:p-4 border-t flex justify-center md:justify-start">
//           <div className="flex items-center space-x-3">
//             <img
//               src="https://via.placeholder.com/40"
//               alt="user"
//               className="w-10 h-10 rounded-full"
//             />
//             <div className="hidden md:block">
//               <p className="text-sm font-semibold">Oluwaseun Adewa</p>
//               <p className="text-xs text-gray-500">example@email.com</p>
//             </div>
//           </div>
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 flex flex-col">
//         {/* Header */}
//         <header className="flex items-center justify-between px-4 md:px-6 py-4 border-b bg-white">
//           <input
//             type="text"
//             placeholder="Find Prompts"
//             className="w-full max-w-md px-4 py-2 border rounded-lg"
//           />
//           <button className="ml-4 px-4 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600">
//             + Share Prompt
//           </button>
//         </header>

//         {/* Community Feed */}
//         <div className="px-4 md:px-6 py-6 flex-1 overflow-y-auto">
//           <h2 className="text-2xl font-bold mb-2">Community Feed</h2>
//           <p className="text-gray-500 mb-6">
//             Discover trending prompts and connect with the community
//           </p>

//           {/* Stats */}
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//             <StatCard title="Active Users" value="12.5k" change="+82% last week" />
//             <StatCard title="Prompt Shared" value="3275" change="+92% last week" />
//             <StatCard title="Total Likes" value="2890" change="+45% last week" />
//             <StatCard title="Comments" value="1641" change="+60% last week" />
//           </div>

//           {/* Tabs */}
//           <div className="flex space-x-4 mb-6 overflow-x-auto">
//             <TabButton active label="Trending" />
//             <TabButton label="Recent" />
//             <TabButton label="Most Liked" />
//             <TabButton label="Following" />
//           </div>

//           {/* Feed Items */}
//           <div className="space-y-4">
//             {[
//               {
//                 name: "Sarah John",
//                 time: "2 hours ago",
//                 title: "React Hook Generator",
//                 desc: "Generate custom React hooks with TypeScript support",
//                 tags: ["react", "documentation", "components", "typescript"],
//               },
//               {
//                 name: "David Park",
//                 time: "2 hours ago",
//                 title: "Email Marketing Copy That Converts",
//                 desc: "Create compelling email campaigns that drive engagement and sales",
//                 tags: ["email", "copywriting", "marketing"],
//               },
//               {
//                 name: "Emma Thompson",
//                 time: "2 hours ago",
//                 title: "Creative Story Writing Assistant",
//                 desc: "Craft engaging narratives with rich character development and plot twists",
//                 tags: ["creative", "storytelling", "fiction"],
//               },
//             ].map((item, idx) => (
//               <FeedCard key={idx} {...item} />
//             ))}
//           </div>

//           {/* Load More */}
//           <div className="flex justify-center mt-6">
//             <button className="px-6 py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-600">
//               Load more prompt
//             </button>
//           </div>
//         </div>
//       </main>
//     </section>
//   );
// }

// /* Sidebar Button Component */
// function SidebarButton({
//   icon,
//   label,
// }: {
//   icon: React.ReactNode;
//   label: string;
// }) {
//   return (
//     <div className="relative group w-full flex justify-center md:justify-start">
//       <button className="flex items-center px-3 py-2 rounded-lg hover:bg-purple-100 w-full md:w-auto justify-center md:justify-start">
//         <span className="text-xl">{icon}</span>
//         <span className="hidden md:inline ml-2">{label}</span>
//       </button>
//       {/* Tooltip for mobile */}
//       <span className="absolute left-14 top-2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition md:hidden">
//         {label}
//       </span>
//     </div>
//   );
// }

// /* Stat Card */
// function StatCard({
//   title,
//   value,
//   change,
// }: {
//   title: string;
//   value: string;
//   change: string;
// }) {
//   return (
//     <div className="p-4 bg-white rounded-lg shadow">
//       <p className="text-sm text-gray-500">{title}</p>
//       <p className="text-2xl font-bold">{value}</p>
//       <p className="text-xs text-green-500">{change}</p>
//     </div>
//   );
// }

// /* Tab Button */
// function TabButton({ label, active }: { label: string; active?: boolean }) {
//   return (
//     <button
//       className={`px-4 py-2 rounded-full whitespace-nowrap ${
//         active
//           ? "bg-purple-700 text-white"
//           : "hover:bg-purple-100 text-gray-700"
//       }`}
//     >
//       {label}
//     </button>
//   );
// }

// /* Feed Card */
// function FeedCard({
//   name,
//   time,
//   title,
//   desc,
//   tags,
// }: {
//   name: string;
//   time: string;
//   title: string;
//   desc: string;
//   tags: string[];
// }) {
//   return (
//     <div className="bg-white p-4 rounded-lg shadow flex flex-col space-y-3">
//       <div className="flex items-center space-x-3">
//         <img
//           src="https://via.placeholder.com/40"
//           alt={name}
//           className="w-10 h-10 rounded-full"
//         />
//         <div>
//           <p className="font-semibold text-sm">{name}</p>
//           <p className="text-xs text-gray-500">{time}</p>
//         </div>
//       </div>
//       <div>
//         <h3 className="font-bold">{title}</h3>
//         <p className="text-sm text-gray-600">{desc}</p>
//       </div>
//       <div className="flex flex-wrap gap-2">
//         {tags.map((tag, i) => (
//           <span
//             key={i}
//             className="px-2 py-1 bg-gray-100 rounded text-xs capitalize"
//           >
//             {tag}
//           </span>
//         ))}
//       </div>
//       <div className="flex items-center justify-between">
//         <div className="flex space-x-4 text-sm text-gray-500">
//           <span className="flex items-center space-x-1">
//             <FaEye /> <span>102</span>
//           </span>
//           <span className="flex items-center space-x-1">
//             <FaRegCommentDots /> <span>58</span>
//           </span>
//           <span className="flex items-center space-x-1">
//             <FaRegHeart /> <span>45</span>
//           </span>
//           <span className="flex items-center space-x-1">
//             <FaUser /> <span>12</span>
//           </span>
//         </div>
//         <button className="px-3 py-1 bg-yellow-400 text-white rounded hover:bg-yellow-500 text-sm">
//           Try Prompt
//         </button>
//       </div>
//     </div>
//   );
// }

// export default CTrending;
