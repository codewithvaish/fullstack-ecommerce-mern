import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Package,
  Calendar,
  CreditCard,
  MapPin,
  ArrowLeft,
  Truck,
  CheckCircle,
  Phone,
  User,
} from "lucide-react";

import { getOrderById } from "../services/orderService";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  Processing: "bg-blue-100 text-blue-700",
  Shipped: "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-700",
};

const statusIcons = {
  Pending: Package,
  Processing: Package,
  Shipped: Truck,
  Delivered: CheckCircle,
  Cancelled: Package,
};

export default function OrderDetails() {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder(id);
  }, [id]);

  const fetchOrder = async (orderId) => {
    try {
      const data = await getOrderById(orderId);
      setOrder(data);
    } catch (error) {
      console.error("Failed to fetch order:", error);
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
            Loading order details...
          </p>

        </div>
      </section>
    );
  }

  if (!order) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-slate-50 px-4">

        <div className="w-full max-w-md rounded-3xl bg-white p-10 text-center shadow-sm">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
            <Package
              size={30}
              className="text-slate-400"
            />
          </div>

          <h2 className="mt-5 text-2xl font-bold text-slate-800">
            Order Not Found
          </h2>

          <p className="mt-2 text-slate-500">
            We couldn't find the order you're looking for.
          </p>

          <Link
            to="/orders"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <ArrowLeft size={18} />
            Back to Orders
          </Link>

        </div>

      </section>
    );
  }

  const StatusIcon =
    statusIcons[order.orderStatus] || Package;

  const statusClass =
    statusStyles[order.orderStatus] ||
    "bg-slate-100 text-slate-700";

  const itemsTotal = order.products.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  return (
    <section className="min-h-screen bg-slate-50 px-4 py-10">
      <div className="mx-auto max-w-5xl">

        {/* Back Button */}

        <Link
          to="/orders"
          className="mb-6 inline-flex items-center gap-2 font-semibold text-indigo-600 transition hover:text-indigo-700"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>

        {/* Main Card */}

        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">

          {/* Order Header */}

          <div className="border-b border-slate-100 p-6 sm:p-8">

            <div className="flex flex-col gap-7 lg:flex-row lg:items-start lg:justify-between">

              {/* Order Information */}

              <div>

                <p className="text-sm font-medium uppercase tracking-wide text-slate-400">
                  Order Details
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-800 sm:text-4xl">
                  #{order._id.slice(-6).toUpperCase()}
                </h1>

                <div className="mt-5 space-y-3 text-sm text-slate-600 sm:text-base">

                  <div className="flex items-center gap-3">
                    <Calendar
                      size={18}
                      className="shrink-0 text-slate-400"
                    />

                    <span>
                      {new Date(
                        order.createdAt
                      ).toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <CreditCard
                      size={18}
                      className="shrink-0 text-slate-400"
                    />

                    <span>
                      Payment: {order.paymentMethod}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">

                    <StatusIcon
                      size={18}
                      className="shrink-0 text-slate-400"
                    />

                    <span
                      className={`rounded-full px-4 py-1 text-sm font-semibold ${statusClass}`}
                    >
                      {order.orderStatus}
                    </span>

                  </div>

                </div>

              </div>

              {/* Total */}

              <div className="rounded-2xl bg-indigo-50 p-6 lg:min-w-52 lg:text-right">

                <p className="text-sm font-medium text-slate-500">
                  Total Amount
                </p>

                <p className="mt-1 text-3xl font-black text-indigo-600 sm:text-4xl">
                  ₹{order.totalPrice.toLocaleString("en-IN")}
                </p>

              </div>

            </div>

          </div>

          {/* Order Content */}

          <div className="p-6 sm:p-8">

            {/* Shipping Address */}

            <div>

              <h2 className="mb-5 flex items-center gap-2 text-xl font-bold text-slate-800">
                <MapPin
                  size={21}
                  className="text-indigo-600"
                />
                Shipping Address
              </h2>

              <div className="rounded-2xl bg-slate-50 p-5 sm:p-6">

                <div className="space-y-3">

                  <div className="flex items-start gap-3">

                    <User
                      size={18}
                      className="mt-1 shrink-0 text-slate-400"
                    />

                    <div>
                      <p className="text-sm text-slate-500">
                        Recipient
                      </p>

                      <p className="font-semibold text-slate-800">
                        {order.shippingAddress?.fullName}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-start gap-3">

                    <Phone
                      size={18}
                      className="mt-1 shrink-0 text-slate-400"
                    />

                    <div>
                      <p className="text-sm text-slate-500">
                        Phone
                      </p>

                      <p className="font-medium text-slate-800">
                        {order.shippingAddress?.phone}
                      </p>
                    </div>

                  </div>

                  <div className="border-t border-slate-200 pt-3">

                    <p className="text-sm text-slate-500">
                      Delivery Address
                    </p>

                    <div className="mt-1 leading-7 text-slate-700">

                      <p>
                        {order.shippingAddress?.address}
                      </p>

                      <p>
                        {order.shippingAddress?.city},{" "}
                        {order.shippingAddress?.state}
                      </p>

                      <p>
                        {order.shippingAddress?.pincode}
                      </p>

                    </div>

                  </div>

                </div>

              </div>

            </div>

            <div className="my-9 border-t border-slate-100" />

            {/* Products */}

            <div>

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <h2 className="flex items-center gap-2 text-xl font-bold text-slate-800">
                    <Package
                      size={21}
                      className="text-indigo-600"
                    />
                    Ordered Products
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {order.products.length}{" "}
                    {order.products.length === 1
                      ? "product"
                      : "products"}{" "}
                    in this order
                  </p>

                </div>

              </div>

              <div className="space-y-4">

                {order.products.map((item, index) => (

                  <div
                    key={item.product || index}
                    className="flex flex-col gap-4 rounded-2xl border border-slate-200 p-4 sm:flex-row sm:items-center sm:p-5"
                  >

                    {/* Product Image */}

                    <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-50">

                      <img
                        src={item.image}
                        alt={item.name}
                        onError={(e) => {
                          e.currentTarget.src =
                            "https://placehold.co/120x120?text=No+Image";
                        }}
                        className="h-full w-full object-contain p-2"
                      />

                    </div>

                    {/* Product Info */}

                    <div className="min-w-0 flex-1">

                      <h3 className="text-lg font-bold text-slate-800">
                        {item.name}
                      </h3>

                      <div className="mt-2 space-y-1 text-sm text-slate-500">

                        <p>
                          Quantity: {item.quantity}
                        </p>

                        <p>
                          Unit Price: ₹
                          {item.price.toLocaleString("en-IN")}
                        </p>

                      </div>

                    </div>

                    {/* Subtotal */}

                    <div className="border-t pt-4 sm:border-t-0 sm:pt-0 sm:text-right">

                      <p className="text-sm text-slate-500">
                        Subtotal
                      </p>

                      <p className="mt-1 text-xl font-bold text-indigo-600">
                        ₹
                        {(
                          item.price * item.quantity
                        ).toLocaleString("en-IN")}
                      </p>

                    </div>

                  </div>

                ))}

              </div>

            </div>

            <div className="my-9 border-t border-slate-100" />

            {/* Order Summary */}

            <div className="flex justify-end">

              <div className="w-full rounded-2xl bg-slate-50 p-6 sm:max-w-md">

                <h2 className="mb-5 text-xl font-bold text-slate-800">
                  Order Summary
                </h2>

                <div className="space-y-4">

                  <div className="flex justify-between gap-4 text-slate-600">
                    <span>Items Total</span>

                    <span className="font-medium text-slate-800">
                      ₹{itemsTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-slate-600">

                    <span>Shipping</span>

                    <span className="font-semibold text-green-600">
                      FREE
                    </span>

                  </div>

                  <div className="border-t border-slate-200 pt-4">

                    <div className="flex justify-between gap-4 text-xl font-bold">

                      <span>Total</span>

                      <span className="text-indigo-600">
                        ₹{order.totalPrice.toLocaleString("en-IN")}
                      </span>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}