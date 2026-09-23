import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import {
  ShoppingBag,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  Truck,
  Headphones,
  ArrowRight,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useApp();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    const result = await loginUser(
      email,
      password,
      remember
    );

    setLoading(false);

    if (!result.success) {
      alert(result.message);
      return;
    }

    setEmail("");
    setPassword("");
    setRemember(false);

    navigate("/");
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

                Shop Smarter.
                <br />
                Live Better.

              </h1>

              <p className="mt-6 max-w-md text-lg leading-8 text-indigo-100">

                Discover premium products with secure checkout,
                lightning-fast delivery and an effortless shopping
                experience.

              </p>

            </div>

          </div>

          <div className="space-y-5">

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">

              <ShieldCheck />

              <div>

                <h3 className="font-semibold">

                  Secure Checkout

                </h3>

                <p className="text-sm text-indigo-100">

                  Protected authentication & payments.

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">

              <Truck />

              <div>

                <h3 className="font-semibold">

                  Fast Delivery

                </h3>

                <p className="text-sm text-indigo-100">

                  Quick shipping on every order.

                </p>

              </div>

            </div>

            <div className="flex items-center gap-4 rounded-2xl bg-white/10 p-4 backdrop-blur">

              <Headphones />

              <div>

                <h3 className="font-semibold">

                  24/7 Support

                </h3>

                <p className="text-sm text-indigo-100">

                  We're here whenever you need us.

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

              Welcome Back

            </h2>

            <p className="mt-2 text-slate-500">

              Sign in to continue your shopping journey.

            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

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
                  placeholder="john@gmail.com"
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  className="w-full rounded-xl border py-3 pl-12 pr-4 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

              </div>

            </div>

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
                  type={showPassword ? "text":"password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="w-full rounded-xl border py-3 pl-12 pr-12 outline-none transition focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100"
                />

                <button
                  type="button"
                  onClick={()=>setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-indigo-600"
                >
                  {showPassword ? <EyeOff size={20}/> : <Eye size={20}/>}
                </button>

              </div>

            </div>

            <div className="flex items-center justify-between text-sm">

              <label className="flex items-center gap-2">

                <input
                  type="checkbox"
                  checked={remember}
                  onChange={()=>setRemember(!remember)}
                />

                Remember Me

              </label>

              <Link
                to="/forgot-password"
                className="font-medium text-indigo-600 hover:underline"
              >
                Forgot Password?
              </Link>

            </div>

            <button
              disabled={loading || !email || !password}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 font-semibold text-white transition hover:bg-indigo-700 hover:shadow-xl"
            >

              {loading ? "Signing In..." : "Sign In"}

              {!loading && <ArrowRight size={18}/>}

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
            to="/register"
            className="flex w-full items-center justify-center rounded-xl border-2 border-indigo-600 py-3 font-semibold text-indigo-600 transition hover:bg-indigo-600 hover:text-white"
          >

            Create Account

          </Link>

        </div>

      </div>

    </div>

  </section>
);
}

export default Login;