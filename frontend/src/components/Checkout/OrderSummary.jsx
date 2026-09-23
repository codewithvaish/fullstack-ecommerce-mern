import { useNavigate } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { createOrder } from "../../services/orderService";


export default function OrderSummary({
  shipping,
  paymentMethod,
}) {
  const navigate = useNavigate();

  const {
    cart,
    clearCart,
    showToast,
  } = useApp();

  const subtotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shippingCharge = 0;

  const total = subtotal + shippingCharge;

  const handlePlaceOrder = async () => {
    if (
      !shipping.fullName ||
      !shipping.phone ||
      !shipping.address ||
      !shipping.city ||
      !shipping.state ||
      !shipping.pincode
    ) {
      showToast("Please fill all shipping details.", "error");
      return;
    }

    if (shipping.phone.length !== 10) {
      showToast("Please enter a valid 10-digit phone number.", "error");
      return;
    }

    if (cart.length === 0) {
      showToast("Your cart is empty.", "error");
      return;
    }

    try {
      const orderData = {
        products: cart.map((item) => ({
          product: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
        })),
        shippingAddress: shipping,
        paymentMethod,
        totalPrice: total,
      };

      await createOrder(orderData);

      showToast("Order placed successfully!");

      clearCart();

      navigate("/orders");

    } catch (error) {
      showToast(
        error.response?.data?.message || "Failed to place order",
        "error"
      );
    }
  };

  return (
    <div className="sticky top-24 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Order Summary
      </h2>

      {/* Products */}

      <div className="space-y-5">

        {cart.length === 0 ? (

          <div className="py-10 text-center">

            <ShoppingBag
              size={40}
              className="mx-auto mb-3 text-slate-300"
            />

            <p className="text-slate-500">
              Your cart is empty
            </p>

          </div>

        ) : (

          cart.map((item) => (

            <div
              key={item._id}
              className="flex items-center gap-4"
            >

              <img
                src={item.image}
                alt={item.name}
                className="h-20 w-20 rounded-xl border bg-white p-2 object-contain"
              />

              <div className="flex-1">

                <h3 className="font-semibold text-slate-800">
                  {item.name}
                </h3>

                <p className="text-sm text-slate-500">
                  Qty : {item.quantity}
                </p>

              </div>

              <p className="font-semibold text-slate-700">
                ₹
                {(item.price * item.quantity).toFixed(2)}
              </p>

            </div>

          ))

        )}

      </div>

      {/* Divider */}

      <div className="my-6 border-t" />

      {/* Price Details */}

      <div className="space-y-4">

        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>

          <span>
            ₹{subtotal.toFixed(2)}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Shipping</span>

          <span className="font-medium text-green-600">
            FREE
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Payment</span>

          <span>{paymentMethod}</span>
        </div>

        <div className="border-t pt-4" />

        <div className="flex justify-between text-xl font-bold text-slate-800">

          <span>Total</span>

          <span>
            ₹{total.toFixed(2)}
          </span>

        </div>

      </div>

      {/* Button */}

      <button
        onClick={handlePlaceOrder}
        disabled={cart.length === 0}
        className="mt-8 w-full rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-slate-300"
      >
        Place Order
      </button>

    </div>
  );
}