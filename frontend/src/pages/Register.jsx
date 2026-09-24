import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

import {
  ShoppingBag,
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Truck,
  Headphones,
  ArrowRight,
} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://fullstack-ecommerce-mern.onrender.com/api/auth/register" ,       
        {
        name,
        email,
        password,
      }
      );

      toast.success("Account created successfully!");

      setFormData({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Registration failed"
      );
    } finally {
      setLoading(false);
    }
  };


  return (
    <section className="min-h-screen bg-slate-100">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* LEFT SIDE */}

        <div className="relative hidden overflow-hidden bg-gradient-to-br from-indigo-700 via-indigo-600 to-slate-900 lg:flex">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,.15),transparent_40%)]"></div>

          <div className="relative z-10 flex w-full flex-col justify-between p-14 text-white">

            <div>

              <div className="flex items-center gap-3">

                <div className="rounded-2xl bg-white/20 p-3 backdrop-blur">
                  <ShoppingBag size={32} />
                </div>

                <div>
                  <h2 className="text-3xl font-black">
                    ShopHub
                  </h2>

                  <p className="text-indigo-100">
                    Full Stack MERN Store
                  </p>
                </div>

              </div>

              <div className="mt-16">

                <h1 className="text-5xl font-black leading-tight">
                  Join The
                  <br />
                  Shopping Revolution.
                </h1>

                <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">
                  Create your free account to discover premium products,
                  manage your wishlist, track orders and enjoy a seamless
                  shopping experience.
                </p>

              </div>

            </div>

            <div className="space-y-5">

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                <ShieldCheck />

                <div>
                  <h3 className="font-semibold">
                    Secure Account
                  </h3>

                  <p className="text-sm text-indigo-100">
                    Your data stays protected.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                <Truck />

                <div>
                  <h3 className="font-semibold">
                    Easy Order Tracking
                  </h3>

                  <p className="text-sm text-indigo-100">
                    Stay updated on every purchase.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">
                <Headphones />

                <div>
                  <h3 className="font-semibold">
                    Customer Support
                  </h3>

                  <p className="text-sm text-indigo-100">
                    We're always here to help.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="flex items-center justify-center px-6 py-10">

          <div className="w-full max-w-lg rounded-3xl border border-white bg-white p-10 shadow-2xl">

            <div className="mb-8 text-center">

              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600 text-white shadow-lg">
                <ShoppingBag size={28} />
              </div>

              <h2 className="text-3xl font-black text-slate-900">
                Create Account
              </h2>

              <p className="mt-2 text-slate-500">
                Join ShopHub and start shopping today.
              </p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Name */}

              <div>

                <label className="mb-2 block font-semibold">
                  Full Name
                </label>

                <div className="relative">

                  <User
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={name}
                    onChange={handleChange}
                    className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                </div>

              </div>

              {/* Email */}

              <div>

                <label className="mb-2 block font-semibold">
                  Email
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    placeholder="john@gmail.com"
                    value={email}
                    onChange={handleChange}
                    className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block font-semibold">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create password"
                    value={password}
                    onChange={handleChange}
                    className="w-full rounded-xl border py-3 pl-12 pr-12 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}

              <div>

                <label className="mb-2 block font-semibold">
                  Confirm Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full rounded-xl border px-4 py-3 pl-12 pr-12"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(!showConfirmPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>

                </div>

              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-700 hover:shadow-xl disabled:cursor-not-allowed disabled:bg-slate-400"
              >

                {loading ? "Creating Account..." : "Create Account"}

                {!loading && <ArrowRight size={18} />}

              </button>

            </form>

            <div className="my-8 flex items-center">

              <div className="h-px flex-1 bg-slate-200"></div>

              <span className="px-4 text-sm text-slate-400">
                OR
              </span>

              <div className="h-px flex-1 bg-slate-200"></div>

            </div>

            <Link
              to="/login"
              className="flex w-full items-center justify-center rounded-xl border-2 border-indigo-600 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
            >
              Already have an account? Sign In
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Register;