import { ArrowRight, Star, ShieldCheck, Truck, RotateCcw } from "lucide-react";
import { Link } from "react-router-dom";

function HeroBanner() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-linear-to-br from-indigo-50 via-white to-purple-50">
        {/* Background Decoration */}
        <div className="absolute top-0 left-0 w-80 h-80 bg-indigo-200 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 translate-x-1/3 translate-y-1/3"></div>

        <div className="max-w-7xl mx-auto px-6 lg:px-10 py-16 lg:py-24 grid lg:grid-cols-2 gap-16 items-center">

          {/* Left Side */}
          <div>

            <span className="inline-flex items-center bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-semibold">
              New Collection 2026
            </span>

            <h1 className="mt-6 text-5xl lg:text-7xl font-extrabold leading-tight text-gray-900">
              Discover Your
              <span className="text-indigo-600"> Perfect </span>
              Style
            </h1>

            <p className="mt-6 text-lg text-gray-600 leading-8 max-w-lg">
              Explore premium fashion, electronics, jewelry, and more.
              Shop thousands of products with exclusive offers and fast delivery.
            </p>

            <div className="flex flex-wrap gap-4 mt-10">

              <Link
                to="/shop"
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-7 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>

              
            </div>

          </div>

          {/* Right Side */}

          <div className="relative">

            <img
              src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=900"
              alt="Shopping"
              className="rounded-3xl shadow-2xl w-full object-cover hover:scale-105 transition duration-500"
            />

          </div>

        </div>
      </section>

      {/* Features */}

      <section className="bg-white border-y">
        <div className="max-w-7xl mx-auto px-6 py-10 grid md:grid-cols-3 gap-8">

          <div className="flex items-center gap-4">
            <div className="bg-indigo-100 p-3 rounded-xl">
              <Truck className="text-indigo-600" />
            </div>

            <div>
              <h3 className="font-semibold">
                Free Shipping
              </h3>

              <p className="text-gray-500 text-sm">
                On orders above ₹999
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-xl">
              <ShieldCheck className="text-green-600" />
            </div>

            <div>
              <h3 className="font-semibold">
                Secure Payment
              </h3>

              <p className="text-gray-500 text-sm">
                100% Protected Checkout
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="bg-orange-100 p-3 rounded-xl">
              <RotateCcw className="text-orange-500" />
            </div>

            <div>
              <h3 className="font-semibold">
                Easy Returns
              </h3>

              <p className="text-gray-500 text-sm">
                7 Days Return Policy
              </p>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}

export default HeroBanner;