import { useNavigate } from "react-router-dom";
import {
  User,
  Mail,
  ShoppingBag,
  Heart,
  MapPin,
  Settings,
  ShoppingCart,
  Edit,
  LogOut,
  ArrowRight,
} from "lucide-react";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { getMyOrders } from "../services/orderService";

import { useApp } from "../context/AppContext";

function Profile() {
  const navigate = useNavigate();

  const {
    currentUser: user,
    cartCount,
    wishlistCount,
    logoutUser,
  } = useApp();

  const [orderCount, setOrderCount] = useState(0);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    const fetchOrderCount = async () => {
      try {
        const orders = await getMyOrders();
        setOrderCount(orders.length);
      } catch (error) {
        console.error("Failed to fetch order count:", error);
      } finally {
        setOrdersLoading(false);
      }
    };

    if (user) {
      fetchOrderCount();
    }
  }, [user]);

  const logout = async () => {
    const result = await Swal.fire({
      title: "Logout?",
      text: "Are you sure you want to logout?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#dc2626",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      focusCancel: true,
    });

    if (!result.isConfirmed) return;

    logoutUser();

    await Swal.fire({
      title: "Logged Out",
      text: "You have been logged out successfully.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    navigate("/login");
  };

  if (!user) return null;

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Profile Header */}

        <div className="rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl sm:p-8 lg:p-10">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5 sm:gap-6">

              {/* Avatar */}

              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-white text-3xl font-bold text-blue-700 shadow-lg sm:h-24 sm:w-24 sm:text-4xl">
                {user.name?.charAt(0).toUpperCase()}
              </div>

              {/* User Info */}

              <div>

                <p className="mb-1 text-sm font-medium text-blue-100">
                  My Account
                </p>

                <h1 className="text-2xl font-bold sm:text-4xl">
                  {user.name}
                </h1>

                <p className="mt-1 text-sm text-blue-100 sm:text-base">
                  Manage your account and shopping preferences
                </p>

              </div>

            </div>

            {/* Header Actions */}

            <div className="flex flex-col gap-3 sm:flex-row">

              <button
                onClick={() => navigate("/profile/edit")}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 font-semibold text-blue-700 transition hover:bg-blue-50"
              >
                <Edit size={18} />
                Edit Profile
              </button>

              <button
                onClick={logout}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-5 py-3 font-semibold text-white transition hover:bg-red-600"
              >
                <LogOut size={18} />
                Logout
              </button>

            </div>

          </div>

        </div>

        {/* Account + Shopping Information */}

        <div className="mt-8 grid gap-6 md:grid-cols-2">

          {/* Account Details */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <div className="mb-6 flex items-center justify-between">

              <div>
                <h2 className="text-xl font-bold text-slate-800">
                  Account Details
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Your personal account information
                </p>
              </div>

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <User size={21} />
              </div>

            </div>

            <div className="space-y-5">

              {/* Name */}

              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <User size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-slate-500">
                    Full Name
                  </p>

                  <p className="mt-1 break-words font-semibold text-slate-800">
                    {user.name}
                  </p>
                </div>

              </div>

              {/* Email */}

              <div className="flex items-start gap-4">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Mail size={18} />
                </div>

                <div className="min-w-0">
                  <p className="text-sm text-slate-500">
                    Email Address
                  </p>

                  <p className="mt-1 break-all font-semibold text-slate-800">
                    {user.email}
                  </p>
                </div>

              </div>

            </div>

            <button
              onClick={() => navigate("/profile/edit")}
              className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 transition hover:text-indigo-700"
            >
              Edit account information
              <ArrowRight size={16} />
            </button>

          </div>

          {/* Shopping Overview */}

          <div className="grid grid-cols-3 gap-3">

  {/* Orders */}

  <button
    onClick={() => navigate("/orders")}
    className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-200 hover:bg-indigo-50"
  >
    <ShoppingBag
      size={21}
      className="mb-3 text-indigo-600"
    />

    <p className="text-2xl font-bold text-slate-800">
      {ordersLoading ? "..." : orderCount}
    </p>

    <p className="mt-1 text-sm text-slate-500">
      Orders
    </p>
  </button>

  {/* Wishlist */}

  <button
    onClick={() => navigate("/wishlist")}
    className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-200 hover:bg-indigo-50"
  >
    <Heart
      size={21}
      className="mb-3 text-rose-500"
    />

    <p className="text-2xl font-bold text-slate-800">
      {wishlistCount}
    </p>

    <p className="mt-1 text-sm text-slate-500">
      Wishlist
    </p>
  </button>

  {/* Cart */}

  <button
    onClick={() => navigate("/cart")}
    className="rounded-xl border border-slate-200 p-4 text-left transition hover:border-indigo-200 hover:bg-indigo-50"
  >
    <ShoppingCart
      size={21}
      className="mb-3 text-emerald-600"
    />

    <p className="text-2xl font-bold text-slate-800">
      {cartCount}
    </p>

    <p className="mt-1 text-sm text-slate-500">
      Cart Items
    </p>
  </button>

</div>

        </div>

        {/* Quick Actions */}

        <div className="mt-10">

          <div className="mb-6">

            <h2 className="text-2xl font-bold text-slate-800">
              Quick Actions
            </h2>

            <p className="mt-1 text-slate-500">
              Quickly access your shopping activities
            </p>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {/* Orders */}

            <button
              onClick={() => navigate("/orders")}
              className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 transition group-hover:bg-indigo-600 group-hover:text-white">
                <ShoppingBag size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                My Orders
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View your order history and track your purchases.
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                View Orders
                <ArrowRight size={15} />
              </span>
            </button>

            {/* Wishlist */}

            <button
              onClick={() => navigate("/wishlist")}
              className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-500 transition group-hover:bg-rose-500 group-hover:text-white">
                <Heart size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                Wishlist
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                View and manage products you've saved for later.
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                View Wishlist
                <ArrowRight size={15} />
              </span>
            </button>

            {/* Cart */}

            <button
              onClick={() => navigate("/cart")}
              className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 transition group-hover:bg-emerald-600 group-hover:text-white">
                <ShoppingCart size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                Shopping Cart
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Review your selected products before checkout.
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                View Cart
                <ArrowRight size={15} />
              </span>
            </button>

            {/* Account Settings */}

            <button
              onClick={() => navigate("/profile/edit")}
              className="group rounded-2xl bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-600 transition group-hover:bg-slate-700 group-hover:text-white">
                <Settings size={22} />
              </div>

              <h3 className="mt-5 text-lg font-bold text-slate-800">
                Account Settings
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Update your name, email, or password.
              </p>

              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-indigo-600">
                Manage Account
                <ArrowRight size={15} />
              </span>
            </button>

          </div>

        </div>

        {/* Account Security */}

        <div className="mt-8 rounded-2xl border border-indigo-100 bg-indigo-50 p-6">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <h3 className="font-bold text-slate-800">
                Keep your account information up to date
              </h3>

              <p className="mt-1 text-sm text-slate-600">
                You can update your personal information and password anytime.
              </p>

            </div>

            <button
              onClick={() => navigate("/profile/edit")}
              className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              <Edit size={17} />
              Edit Profile
            </button>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Profile;