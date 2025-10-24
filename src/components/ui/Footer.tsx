import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";
import CFooter from "./CFooter";
import CTA from "./CTA";

function Footer() {
  return (
    <>
      <CTA />
      <footer className="bg-[#270450] text-gray-200 py-12">
        <div className=" width max-w-6xl mx-auto px-4 grid gap-8 md:grid-cols-3">
          <div>
            <h2 className="font-bold text-lg text-white">PromptPal</h2>
            <p className="text-sm mt-2">
              PromptPal is your smart assistant for creating, refining, and
              improving prompts. Helping creators, marketers, and developers
              save time.
            </p>
            <div className="flex gap-4 mt-4">
              <a href="#" className="hover:text-white">
                <FaFacebook />
              </a>
              <a href="#" className="hover:text-white">
                <FaInstagram />
              </a>
              <a href="#" className="hover:text-white">
                <FaLinkedin />
              </a>
              <a href="#" className="hover:text-white">
                <FaXTwitter />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/discover" className="hover:text-white">
                  Discover
                </a>
              </li>
              <li>
                <a href="/dashboard/promptpal-community" className="hover:text-white">
                  Community
                </a>
              </li>
              <li>
                <a href="dashboard/promptpal-library" className="hover:text-white">
                  Resources
                </a>
              </li>
              <li>
                <a href="/pricing" className="hover:text-white">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>
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

        <CFooter />
      </footer>
    </>
  );
}

export default Footer;
