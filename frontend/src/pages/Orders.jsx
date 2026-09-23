import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Package,
  Calendar,
  CreditCard,
  Eye,
  ShoppingBag,
  ArrowRight,
} from "lucide-react";

import { getMyOrders } from "../services/orderService";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getMyOrders();
      setOrders(data);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-slate-200 border-t-indigo-600" />

          <p className="mt-4 font-medium text-slate-600">
            Loading your orders...
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Page Header */}

        <div className="mb-8">

          <div className="flex items-center gap-3">

            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-indigo-600">
              <ShoppingBag size={24} />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-800 sm:text-4xl">
                My Orders
              </h1>

              <p className="mt-1 text-sm text-slate-500 sm:text-base">
                View and track your recent purchases
              </p>
            </div>

          </div>

        </div>

        {/* Empty State */}

        {orders.length === 0 ? (
          <div className="rounded-3xl bg-white px-6 py-14 text-center shadow-sm sm:px-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-slate-100">
              <Package
                size={38}
                className="text-slate-400"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-slate-800">
              No Orders Yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-slate-500">
              You haven't placed any orders yet. Explore our products and
              place your first order.
            </p>

            <Link
              to="/shop"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
            >
              Continue Shopping
              <ArrowRight size={18} />
            </Link>

          </div>
        ) : (

          /* Orders List */

          <div className="space-y-6">

            {orders.map((order) => (

              <div
                key={order._id}
                className="overflow-hidden rounded-3xl bg-white shadow-sm transition hover:shadow-md"
              >

                {/* Order Header */}

                <div className="border-b border-slate-100 p-5 sm:p-6">

                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

                    <div>

                      <div className="flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                          <Package size={20} />
                        </div>

                        <div>
                          <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                            Order ID
                          </p>

                          <h2 className="font-bold text-slate-800">
                            #{order._id.slice(-6).toUpperCase()}
                          </h2>
                        </div>

                      </div>

                      <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-500">

                        <div className="flex items-center gap-2">
                          <Calendar size={16} />
                          <span>
                            {new Date(
                              order.createdAt
                            ).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <CreditCard size={16} />
                          <span>
                            {order.paymentMethod}
                          </span>
                        </div>

                      </div>

                    </div>

                    {/* Price + Status */}

                    <div className="sm:text-right">

                      <p className="text-2xl font-bold text-indigo-600">
                        ₹{order.totalPrice.toLocaleString("en-IN")}
                      </p>

                      <span
                        className={`mt-2 inline-block rounded-full px-4 py-1 text-xs font-semibold ${
                          statusStyles[order.orderStatus] ||
                          "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {order.orderStatus}
                      </span>

                    </div>

                  </div>

                </div>

                {/* Products */}

                <div className="p-5 sm:p-6">

                  <div className="mb-4 flex items-center justify-between">

                    <h3 className="font-semibold text-slate-800">
                      Ordered Products
                    </h3>

                    <span className="text-sm text-slate-500">
                      {order.products.length}{" "}
                      {order.products.length === 1
                        ? "Product"
                        : "Products"}
                    </span>

                  </div>

                  <div className="space-y-4">

                    {order.products.map((item, index) => (

                      <div
                        key={index}
                        className="flex items-center gap-4 rounded-xl bg-slate-50 p-3 sm:p-4"
                      >

                        {/* Product Image */}

                        <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white sm:h-20 sm:w-20">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="h-full w-full object-contain p-1"
                          />
                        </div>

                        {/* Product Info */}

                        <div className="min-w-0 flex-1">

                          <p className="truncate font-semibold text-slate-800">
                            {item.name}
                          </p>

                          <p className="mt-1 text-sm text-slate-500">
                            Quantity: {item.quantity}
                          </p>

                        </div>

                        {/* Price */}

                        <div className="shrink-0 text-right">

                          <p className="font-semibold text-slate-800">
                            ₹{item.price.toLocaleString("en-IN")}
                          </p>

                          {item.quantity > 1 && (
                            <p className="mt-1 text-xs text-slate-400">
                              × {item.quantity}
                            </p>
                          )}

                        </div>

                      </div>

                    ))}

                  </div>

                  {/* Footer */}

                  <div className="mt-6 flex flex-col gap-4 border-t border-slate-100 pt-5 sm:flex-row sm:items-center sm:justify-between">

                    <div>
                      <p className="text-sm text-slate-500">
                        Total Amount
                      </p>

                      <p className="text-xl font-bold text-slate-800">
                        ₹{order.totalPrice.toLocaleString("en-IN")}
                      </p>
                    </div>

                    <Link
                      to={`/orders/${order._id}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-600"
                    >
                      <Eye size={18} />
                      View Details
                    </Link>

                  </div>

                </div>

              </div>

            ))}

          </div>

        )}

      </div>
    </section>
  );
}