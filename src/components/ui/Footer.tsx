import React from "react";
import CFooter from "../layout/CFooter";
import CTA from "./CTA";

function Footer() {
  return (
   <>
   <CTA/>
     <footer className="bg-purple-900 text-gray-200 py-12">
      <div className=" width max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3">
        {/* Logo & About */}
        <div>
          <h2 className="font-bold text-lg text-white">PromptPal</h2>
          <p className="text-sm mt-2">
            PromptPal is your smart assistant for creating, refining, and
            improving prompts. Helping creators, marketers, and developers save
            time.
          </p>
          <div className="flex gap-4 mt-4">
            <a href="#" className="hover:text-white">🌐</a>
            <a href="#" className="hover:text-white">📘</a>
            <a href="#" className="hover:text-white">🐦</a>
            <a href="#" className="hover:text-white">📸</a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white">Discover</a></li>
            <li><a href="#" className="hover:text-white">Community</a></li>
            <li><a href="#" className="hover:text-white">Resources</a></li>
            <li><a href="#" className="hover:text-white">Pricing</a></li>
            <li><a href="#" className="hover:text-white">Contact</a></li>
          </ul>
        </div>

        {/* Features */}
        <div>
          <h3 className="font-semibold text-white mb-3">Features</h3>
          <ul className="space-y-2 text-sm">
            <li>Prompting Templates & Library</li>
            <li>Refinement Tools</li>
            <li>Analytics</li>
            <li>Collaboration</li>
          </ul>
        </div>
      </div>

     <CFooter/>
    </footer>
   </>
  );
}

export default Footer;






// import React from "react";
// import CFooter from "../layout/CFooter";
// import CTA from "./CTA";

// function Footer() {
//   return (
//     <>
//     <CTA/>
//     <footer className="bg-purple-900 text-gray-200 py-12">
//       <div className="max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-4">
//         {/* Logo & About */}
//         <div>
//           <h2 className="font-bold text-lg text-white">PromptPal</h2>
//           <p className="text-sm mt-2">
//             PromptPal is your smart assistant for creating, refining, and
//             improving prompts. Helping creators, marketers, and developers save
//             time.
//           </p>
//           <div className="flex gap-4 mt-4">
//             <a href="#" className="hover:text-white">
//               🌐
//             </a>
//             <a href="#" className="hover:text-white">
//               📘
//             </a>
//             <a href="#" className="hover:text-white">
//               🐦
//             </a>
//             <a href="#" className="hover:text-white">
//               📸
//             </a>
//           </div>
//         </div>

//         {/* Quick Links */}
//         <div>
//           <h3 className="font-semibold text-white mb-3">Quick Links</h3>
//           <ul className="space-y-2 text-sm">
//             <li><a href="#" className="hover:text-white">Discover</a></li>
//             <li><a href="#" className="hover:text-white">Community</a></li>
//             <li><a href="#" className="hover:text-white">Resources</a></li>
//             <li><a href="#" className="hover:text-white">Pricing</a></li>
//             <li><a href="#" className="hover:text-white">Contact</a></li>
//           </ul>
//         </div>

//         {/* Features */}
//         <div>
//           <h3 className="font-semibold text-white mb-3">Features</h3>
//           <ul className="space-y-2 text-sm">
//             <li>Prompting Templates & Library</li>
//             <li>Refinement Tools</li>
//             <li>Analytics</li>
//             <li>Collaboration</li>
//           </ul>
//         </div>

//         {/* Call-to-action
//         <div className="bg-purple-800 p-6 rounded-lg text-center md:col-span-1">
//           <h3 className="text-lg font-bold mb-4">
//             Ready to take your AI prompting to the next level?
//           </h3>
//           <button className="px-6 py-2 bg-white text-purple-800 font-semibold rounded-lg hover:bg-gray-100 transition">
//             Start Free Today
//           </button>
//         </div> */}
//       </div>

//      <CFooter/>
//     </footer>

//     </>
    
//   );
// }

// export default Footer;
