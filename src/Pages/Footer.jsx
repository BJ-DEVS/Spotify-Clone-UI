import { FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#121212] text-gray-400 mt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4">
        
        <hr className="border-gray-800 mb-8" />
        
        {/* Main footer columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          
          {/* Company */}
          <div>
            <h3 className="text-white font-bold text-base mb-3">Company</h3>
            <ul className="space-y-2 text-md">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Jobs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">For the Record</a></li>
            </ul>
          </div>

          {/* Communities */}
          <div>
            <h3 className="text-white font-bold text-base mb-3">Communities</h3>
            <ul className="space-y-2 text-md">
              <li><a href="#" className="hover:text-white transition-colors">For Artists</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Developers</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Advertising</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Investors</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Vendors</a></li>
            </ul>
          </div>

          {/* Useful links */}
          <div>
            <h3 className="text-white font-bold text-base mb-3">Useful links</h3>
            <ul className="space-y-2 text-md">
              <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Free Mobile App</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Popular by Country</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Import your music</a></li>
            </ul>
          </div>

          {/* Spotify Plans */}
          <div>
            <h3 className="text-white font-bold text-base mb-3">Spotify Plans</h3>
            <ul className="space-y-2 text-md">
              <li><a href="#" className="hover:text-white transition-colors">Premium Individual</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Premium Duo</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Premium Family</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Premium Student</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Spotify Free</a></li>
            </ul>
          </div>

          {/* Social Icons */}
          <div>
            <div className="flex gap-3">
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                <FaTwitter className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                <FaFacebook className="w-5 h-5 text-white" />
              </a>
              <a href="#" className="bg-gray-800 hover:bg-gray-700 p-3 rounded-full transition-colors">
                <FaInstagram className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

        </div>

        <hr className="border-gray-800 mb-4" />

        {/* Copyright */}
        <div className="text-sm text-gray-500">
          &copy; 2026 Spotify AB
        </div>

      </div>
    </footer>
  );
};

export default Footer;