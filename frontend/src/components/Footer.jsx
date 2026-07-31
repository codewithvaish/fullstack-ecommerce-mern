import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt
} from "react-icons/fa";

function Footer() {

  return (

    <footer className="bg-slate-900 text-gray-300 mt-16">


      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">


        {/* Brand */}

        <div>

          <h2 className="text-3xl font-bold text-green-500 mb-4">
            Shopping
          </h2>


          <p className="text-sm leading-6">
            Discover quality products at the best prices.
            Enjoy secure payments, fast delivery and
            a smooth online shopping experience.
          </p>


        </div>

        {/* Navigation */}

        <div>

          <h3 className="text-xl font-semibold text-white mb-4">
            Quick Links
          </h3>


          <ul className="space-y-3">


            <li>
              <Link
                to="/"
                className="hover:text-green-400 transition">
                Home
              </Link>
            </li>


            <li>
              <Link
                to="/shop"
                className="hover:text-green-400 transition">
                Shop
              </Link>
            </li>


            <li>
              <Link
                to="/cart"
                className="hover:text-green-400 transition">
                Cart
              </Link>
            </li>


            <li>
              <Link
                to="/login"
                className="hover:text-green-400 transition">
                Login
              </Link>
            </li>


          </ul>

        </div>

        {/* Customer Service */}

        <div>


          <h3 className="text-xl font-semibold text-white mb-4">
            Customer Care
          </h3>


          <ul className="space-y-3">


            <li className="hover:text-green-400 cursor-pointer">
              Help Center
            </li>


            <li className="hover:text-green-400 cursor-pointer">
              Shipping Policy
            </li>


            <li className="hover:text-green-400 cursor-pointer">
              Return Policy
            </li>


            <li className="hover:text-green-400 cursor-pointer">
              Privacy Policy
            </li>


          </ul>


        </div>

        {/* Contact */}

        <div>


          <h3 className="text-xl font-semibold text-white mb-4">
            Contact
          </h3>


          <div className="space-y-3 text-sm">


            <p className="flex items-center gap-2">
              <FaEnvelope className="text-green-500" />
              support@shopping.com
            </p>


            <p className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-500" />
              +91 98765 43210
            </p>


            <p className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-green-500" />
              Vadodara, Gujarat
            </p>


          </div>


        </div>


      </div>


      {/* Newsletter */}

      <div className="border-t border-slate-700">

        <div className="max-w-7xl mx-auto px-6 py-8">


          <h3 className="text-xl text-white font-semibold">
            Subscribe for Updates
          </h3>


          <div className="flex flex-col sm:flex-row gap-3 mt-4">


            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-3 rounded-lg text-white flex-1"
            />


            <button
              className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white">
              Subscribe
            </button>


          </div>


        </div>


      </div>


      {/* Bottom */}

      <div className="border-t border-slate-700">


        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col md:flex-row justify-between items-center">


          <p className="text-sm">
            © 2026 Shopping. All Rights Reserved.
          </p>

          <div className="flex gap-5 mt-4 md:mt-0">


            <FaFacebook
              className="text-xl cursor-pointer hover:text-green-400" />


            <FaInstagram
              className="text-xl cursor-pointer hover:text-green-400" />


            <FaTwitter
              className="text-xl cursor-pointer hover:text-green-400" />


          </div>

        </div>

      </div>

    </footer>

  );
}

export default Footer;