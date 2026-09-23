import { useState } from "react";
import ShippingForm from "../components/Checkout/ShippingForm";
import PaymentMethod from "../components/Checkout/PaymentMethod";
import OrderSummary from "../components/Checkout/OrderSummary";

export default function Checkout() {
  const [shipping, setShipping] = useState({
    fullName: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });

  const [paymentMethod, setPaymentMethod] = useState(
    "Cash on Delivery"
  );

  const handleShippingChange = (e) => {
    setShipping((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <section className="min-h-screen bg-slate-50 py-10">
      <div className="mx-auto max-w-7xl px-4">

        {/* Heading */}

        <div className="mb-10">
          <h1 className="text-4xl font-bold text-slate-800">
            Checkout
          </h1>

          <p className="mt-2 text-slate-500">
            Complete your order by providing your shipping details.
          </p>
        </div>

        {/* Layout */}

        <div className="grid gap-8 lg:grid-cols-3">

          {/* Left Side */}

          <div className="space-y-6 lg:col-span-2">

            <ShippingForm
              shipping={shipping}
              handleChange={handleShippingChange}
            />

            <PaymentMethod
              paymentMethod={paymentMethod}
              setPaymentMethod={setPaymentMethod}
            />

          </div>

          {/* Right Side */}

          <div>

            <OrderSummary
              shipping={shipping}
              paymentMethod={paymentMethod}
            />

          </div>

        </div>

      </div>
    </section>
  );
}