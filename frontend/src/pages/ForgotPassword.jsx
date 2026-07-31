import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email) {
      alert("Please enter your email.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      alert("No account found with this email.");
      return;
    }

    setMessage(
      "Password reset link has been sent to your email. (Demo Project)"
    );

    setEmail("");
  };

  return (
    <section className="min-h-screen bg-linear-to-br from-blue-100 via-white to-indigo-100 flex items-center justify-center px-4 py-10">

      <div className="max-w-5xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">

        {/* Left Side */}

        <div className="bg-blue-600 text-white p-10 flex flex-col justify-center">

          <h1 className="text-4xl font-bold mb-5">
            Forgot Password?
          </h1>

          <p className="text-blue-100 leading-7">
            Don't worry! Enter your registered email address and we'll send
            you a password reset link.
          </p>

          <div className="mt-10">
            <div className="bg-white/20 rounded-xl p-4">
              <h3 className="font-semibold mb-2">
                Security Tips
              </h3>

              <ul className="space-y-2 text-sm">
                <li>✔ Use a strong password.</li>
                <li>✔ Never share your password.</li>
                <li>✔ Update it regularly.</li>
              </ul>
            </div>
          </div>

        </div>

        {/* Right Side */}

        <div className="p-10 flex flex-col justify-center">

          <h2 className="text-3xl font-bold mb-2">
            Reset Password
          </h2>

          <p className="text-gray-500 mb-8">
            Enter your registered email below.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>

              <label className="font-medium block mb-2">
                Email Address
              </label>

              <input
                type="email"
                placeholder="example@gmail.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none"
              />

            </div>

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Send Reset Link
            </button>

          </form>

          {message && (
            <div className="mt-6 bg-green-100 text-green-700 p-4 rounded-xl">
              {message}
            </div>
          )}

          <div className="mt-8 text-center">

            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              ← Back to Login
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
}

export default ForgotPassword;