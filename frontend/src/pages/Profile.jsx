import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedIn = localStorage.getItem("isLoggedIn");

    if (!loggedIn) {
      navigate("/login");
      return;
    }

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    setUser(currentUser);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");

    alert("Logged Out Successfully");

    navigate("/login");
  };

  if (!user) return null;

  return (
    <section className="min-h-screen bg-slate-100 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Top Banner */}

        <div className="bg-linear-to-r from-blue-600 to-indigo-600 rounded-3xl text-white p-10 shadow-xl">

          <div className="flex flex-col md:flex-row items-center justify-between">

            <div className="flex items-center gap-6">

              <div className="w-24 h-24 rounded-full bg-white text-blue-700 flex items-center justify-center text-4xl font-bold shadow-lg">

                {user.name.charAt(0).toUpperCase()}

              </div>

              <div>

                <h1 className="text-4xl font-bold">

                  Hello, {user.name} 👋

                </h1>

                <p className="mt-2 text-blue-100">

                  Welcome back to our store.

                </p>

              </div>

            </div>

            <button
              onClick={logout}
              className="mt-6 md:mt-0 bg-white text-blue-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition"
            >
              Logout
            </button>

          </div>

        </div>

        {/* User Details */}

        <div className="grid md:grid-cols-3 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

              Account Details

            </h2>

            <div className="space-y-4">

              <div>

                <p className="text-gray-500">

                  Full Name

                </p>

                <p className="font-semibold">

                  {user.name}

                </p>

              </div>

              <div>

                <p className="text-gray-500">

                  Email

                </p>

                <p className="font-semibold">

                  {user.email}

                </p>

              </div>

            </div>

          </div>

          {/* Statistics */}

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-5">

              Shopping Stats

            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">

                <span>Total Orders</span>

                <span className="font-bold">0</span>

              </div>

              <div className="flex justify-between">

                <span>Wishlist</span>

                <span className="font-bold">0</span>

              </div>

              <div className="flex justify-between">

                <span>Cart Items</span>

                <span className="font-bold">

                  {JSON.parse(localStorage.getItem("cart"))?.length || 0}

                </span>

              </div>

            </div>

          </div>

          {/* Membership */}

          <div className="bg-linear-to-br from-yellow-400 to-orange-500 rounded-2xl shadow p-6 text-white">

            <h2 className="text-2xl font-bold">

              Premium Member

            </h2>

            <p className="mt-3">

              Unlock free shipping, exclusive discounts and early access to
              new collections.

            </p>

            <button className="mt-6 bg-white text-orange-600 px-5 py-2 rounded-lg font-semibold">

              Upgrade

            </button>

          </div>

        </div>

        {/* Quick Actions */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-6">

            Quick Actions

          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">

            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition cursor-pointer">

              <div className="text-4xl">📦</div>

              <h3 className="mt-4 font-bold text-lg">

                Orders

              </h3>

              <p className="text-gray-500 mt-2">

                View your order history.

              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition cursor-pointer">

              <div className="text-4xl">❤️</div>

              <h3 className="mt-4 font-bold text-lg">

                Wishlist

              </h3>

              <p className="text-gray-500 mt-2">

                Save your favourite products.

              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition cursor-pointer">

              <div className="text-4xl">📍</div>

              <h3 className="mt-4 font-bold text-lg">

                Addresses

              </h3>

              <p className="text-gray-500 mt-2">

                Manage delivery addresses.

              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow hover:shadow-xl transition cursor-pointer">

              <div className="text-4xl">⚙️</div>

              <h3 className="mt-4 font-bold text-lg">

                Settings

              </h3>

              <p className="text-gray-500 mt-2">

                Update your account preferences.

              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Profile;