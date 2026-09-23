import { Banknote, CreditCard } from "lucide-react";

export default function PaymentMethod({
  paymentMethod,
  setPaymentMethod,
}) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      <h2 className="mb-6 text-2xl font-bold text-slate-800">
        Payment Method
      </h2>

      <div className="space-y-4">

        {/* Cash on Delivery */}

        <label
          className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition ${
            paymentMethod === "Cash on Delivery"
              ? "border-indigo-600 bg-indigo-50"
              : "border-slate-200 hover:border-indigo-300"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-green-100 p-3">
              <Banknote
                size={22}
                className="text-green-600"
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                Cash on Delivery
              </h3>

              <p className="text-sm text-slate-500">
                Pay when your order is delivered.
              </p>
            </div>
          </div>

          <input
            type="radio"
            name="payment"
            value="Cash on Delivery"
            checked={paymentMethod === "Cash on Delivery"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="h-5 w-5 accent-indigo-600"
          />
        </label>

        {/* Mock Online Payment */}

        <label
          className={`flex cursor-pointer items-center justify-between rounded-2xl border p-5 transition ${
            paymentMethod === "Online Payment"
              ? "border-indigo-600 bg-indigo-50"
              : "border-slate-200 hover:border-indigo-300"
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-blue-100 p-3">
              <CreditCard
                size={22}
                className="text-blue-600"
              />
            </div>

            <div>
              <h3 className="font-semibold text-slate-800">
                Online Payment
              </h3>

              <p className="text-sm text-slate-500">
                Mock payment for demonstration purposes.
              </p>
            </div>
          </div>

          <input
            type="radio"
            name="payment"
            value="Online Payment"
            checked={paymentMethod === "Online Payment"}
            onChange={(e) =>
              setPaymentMethod(e.target.value)
            }
            className="h-5 w-5 accent-indigo-600"
          />
        </label>

      </div>
    </div>
  );
}