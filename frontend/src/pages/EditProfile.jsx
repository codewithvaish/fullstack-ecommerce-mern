import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Lock,
  ShieldCheck,
  CircleUserRound,
} from "lucide-react";
import Swal from "sweetalert2";

import { useApp } from "../context/AppContext";
import { updateProfile } from "../services/userService";

function EditProfile() {
  const navigate = useNavigate();

  const {
    currentUser,
    isLoggedIn,
    updateCurrentUser,
  } = useApp();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!isLoggedIn || !currentUser) {
      navigate("/login");
      return;
    }

    setFormData({
      name: currentUser.name || "",
      email: currentUser.email || "",
      password: "",
      confirmPassword: "",
    });
  }, [isLoggedIn, currentUser, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim();
    const password = formData.password.trim();
    const confirmPassword = formData.confirmPassword.trim();

    if (!name || !email) {
      Swal.fire({
        title: "Missing Information",
        text: "Name and email are required.",
        icon: "warning",
      });
      return;
    }

    if (password && password.length < 6) {
      Swal.fire({
        title: "Invalid Password",
        text: "Password must be at least 6 characters.",
        icon: "warning",
      });
      return;
    }

    if (password !== confirmPassword) {
      Swal.fire({
        title: "Password Mismatch",
        text: "New password and confirm password do not match.",
        icon: "warning",
      });
      return;
    }

    try {
      setLoading(true);

      const updatedUser = await updateProfile({
        name,
        email,
        ...(password && { password }),
      });

      updateCurrentUser(updatedUser);

      await Swal.fire({
        title: "Profile Updated",
        text: "Your profile has been updated successfully.",
        icon: "success",
        timer: 1500,
        showConfirmButton: false,
      });

      navigate("/profile");
    } catch (error) {
      Swal.fire({
        title: "Update Failed",
        text:
          error.response?.data?.message ||
          "Unable to update your profile.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  if (!currentUser) {
    return null;
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* Page Header */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>

            <button
              onClick={() => navigate("/profile")}
              className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-indigo-600"
            >
              <ArrowLeft size={17} />
              Back to Profile
            </button>

            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Account Settings
            </h1>

            <p className="mt-1 text-slate-500">
              Manage your personal information and account security.
            </p>

          </div>

        </div>

        {/* Main Layout */}

        <div className="grid gap-6 lg:grid-cols-[280px_minmax(0,1fr)]">

          {/* Left Profile Panel */}

          <aside className="h-fit rounded-2xl border border-slate-200 bg-white shadow-sm">

            <div className="p-6">

              <div className="flex items-center gap-4 lg:block">

                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-3xl font-bold text-indigo-600">

                  {currentUser.name
                    ?.charAt(0)
                    .toUpperCase()}

                </div>

                <div className="mt-0 lg:mt-5">

                  <h2 className="text-xl font-bold text-slate-900">
                    {currentUser.name}
                  </h2>

                  <p className="mt-1 break-all text-sm text-slate-500">
                    {currentUser.email}
                  </p>

                </div>+ 

              </div>

              <div className="my-6 border-t border-slate-100" />

              {/* Navigation */}

              <nav className="space-y-1">

                <button
                  type="button"
                  className="flex w-full items-center gap-3 rounded-xl bg-indigo-50 px-4 py-3 text-left font-semibold text-indigo-700"
                >
                  <CircleUserRound size={19} />
                  Profile Information
                </button>

                <button
                  type="button"
                  onClick={() => navigate("/orders")}
                  className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-left font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                >
                  <User size={19} />
                  My Orders
                </button>

              </nav>

            </div>

            {/* Security Info */}

            <div className="border-t border-slate-100 p-6">

              <div className="flex gap-3">

                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0 text-green-600"
                />

                <div>

                  <p className="text-sm font-semibold text-slate-800">
                    Your account is secure
                  </p>

                  <p className="mt-1 text-xs leading-5 text-slate-500">
                    Keep your account information up to date.
                  </p>

                </div>

              </div>

            </div>

          </aside>

          {/* Right Content */}

          <main className="rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Section Header */}

            <div className="border-b border-slate-100 px-6 py-5 sm:px-8">

              <h2 className="text-xl font-bold text-slate-900">
                Profile Information
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Update the information associated with your account.
              </p>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="px-6 py-7 sm:px-8"
            >

              <div className="grid gap-6 md:grid-cols-2">

                {/* Full Name */}

                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    />

                  </div>

                </div>

                {/* Email */}

                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    />

                  </div>

                </div>

              </div>

              {/* Password Section */}

              <div className="my-8 border-t border-slate-100" />

              <div className="mb-6">

                <div className="flex items-start gap-3">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                    <Lock
                      size={19}
                      className="text-slate-600"
                    />
                  </div>

                  <div>

                    <h3 className="font-bold text-slate-900">
                      Password & Security
                    </h3>

                    <p className="mt-1 text-sm text-slate-500">
                      Change your password if you want to update your account security.
                    </p>

                  </div>

                </div>

              </div>

              <div className="grid gap-6 md:grid-cols-2">

                {/* New Password */}

                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    New Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="password"
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter new password"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    />

                  </div>

                  <p className="mt-2 text-xs text-slate-400">
                    Minimum 6 characters.
                  </p>

                </div>

                {/* Confirm Password */}

                <div>

                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Confirm New Password
                  </label>

                  <div className="relative">

                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    />

                    <input
                      id="confirmPassword"
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Confirm new password"
                      className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                    />

                  </div>

                </div>

              </div>

              {/* Form Footer */}

              <div className="mt-8 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={() => navigate("/profile")}
                  disabled={loading}
                  className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-7 py-3 font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {loading ? (
                    <>
                      <span className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save size={18} />
                      Save Changes
                    </>
                  )}

                </button>

              </div>

            </form>

          </main>

        </div>

      </div>

    </section>
  );
}

export default EditProfile;