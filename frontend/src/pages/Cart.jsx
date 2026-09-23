import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";

import {
  ShoppingCart,
  Trash2,
  Minus,
  Plus,
  ArrowLeft,
  Tag,
  CreditCard,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

function Cart() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useApp();

  const [couponCode, setCouponCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const navigate = useNavigate();

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + item.price * (item.quantity || 1);
    }, 0);
  }, [cart]);


  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => {
      return total + (item.quantity || 1);
    }, 0);
  }, [cart]);


  const shipping = subtotal > 0 ? 5.99 : 0;

  const discountAmount = subtotal * appliedDiscount;

  const totalPrice = subtotal + shipping - discountAmount;


  const applyCoupon = () => {
    const code = couponCode.trim().toUpperCase();

    if (code === "SAVE10") {
      setAppliedDiscount(0.1);
      return;
    }

    if (code === "SAVE20") {
      setAppliedDiscount(0.2);
      return;
    }

    setAppliedDiscount(0);
  };


  const handleCheckout = () => {
    if (cart.length === 0) return;

    navigate("/checkout");
  };


  return (
    <>
      <section className="min-h-screen bg-linear-to-b from-slate-50 to-white py-12">

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">


          <div className="mb-8 flex items-center gap-3">

            <div className="rounded-2xl bg-indigo-100 p-3 text-indigo-600">
              <ShoppingCart size={22} />
            </div>

            <div>
              <h1 className="text-4xl font-black text-slate-900">
                My Shopping Cart
              </h1>

              <p className="mt-1 text-slate-500">
                {totalItems} items in your bag
              </p>
            </div>

          </div>



          {cart.length === 0 ? (

            <div className="rounded-3xl bg-white p-10 text-center shadow-lg sm:p-16">

              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">

                <ShoppingCart
                  size={42}
                  className="text-indigo-600"
                />

              </div>


              <h2 className="mt-6 text-3xl font-bold text-slate-900">
                Your cart is empty
              </h2>


              <p className="mt-3 text-slate-500">
                Add some products from the shop page to continue.
              </p>


              <Link
                to="/shop"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >

                <ArrowLeft size={18} />

                Continue Shopping

              </Link>


            </div>


          ) : (


            <div className="grid gap-8 lg:grid-cols-3">


              <div className="space-y-5 lg:col-span-2">


                <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">


                  <p className="font-semibold text-slate-700">
                    Cart Items ({cart.length})
                  </p>


                  <button
                    onClick={clearCart}
                    className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-2 text-sm font-semibold text-rose-600 transition hover:bg-rose-50"
                  >

                    <Trash2 size={16} />

                    Clear Cart

                  </button>


                </div>




                {cart.map((item) => (

                  <div
                    key={item._id}
                    className="rounded-3xl bg-white p-5 shadow-md transition hover:shadow-xl"
                  >

                    <div className="flex flex-col gap-5 md:flex-row">


                      <div className="flex h-36 items-center justify-center rounded-2xl bg-slate-50 p-4 md:w-40">


                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-full w-full object-contain"
                        />


                      </div>

                      <div className="flex-1">

                        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">

                          <div>

                            <h2 className="line-clamp-2 text-lg font-bold text-slate-900">
                              {item.name}
                            </h2>


                            <p className="mt-2 text-sm capitalize text-slate-500">
                              {item.category}
                            </p>


                          </div>

                          <div className="text-left md:text-right">

                            <p className="text-2xl font-black text-indigo-600">
                              ₹{(item.price * (item.quantity || 1)).toLocaleString()}
                            </p>

                            <p className="text-sm text-slate-400">
                              ₹{item.price.toLocaleString()} each
                            </p>

                          </div>

                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-4">

                          <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50">

                            <button
                              onClick={() => decreaseQuantity(item._id)}
                              className="px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                            >

                              <Minus size={16} />

                            </button>

                            <span className="min-w-12 px-4 text-center font-bold text-slate-900">
                              {item.quantity || 1}
                            </span>



                            <button
                              onClick={() => increaseQuantity(item._id)}
                              className="px-4 py-3 text-slate-700 transition hover:bg-slate-100"
                            >

                              <Plus size={16} />

                            </button>


                          </div>

                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-4 py-3 font-semibold text-rose-600 transition hover:bg-rose-50"
                          >

                            <Trash2 size={16} />

                            Remove

                          </button>



                        </div>



                      </div>


                    </div>


                  </div>


                ))}


              </div>

              <div className="h-fit rounded-3xl border border-slate-200 bg-white p-6 shadow-lg lg:sticky lg:top-6">


                <h2 className="text-2xl font-bold text-slate-900">
                  Order Summary
                </h2>

                <div className="mt-6 space-y-4">


                  <div className="flex justify-between text-slate-600">

                    <span>Subtotal</span>

                    <span className="font-semibold">
                      ₹{subtotal.toLocaleString()}
                    </span>

                  </div>

                  <div className="flex justify-between text-slate-600">

                    <span>Shipping</span>

                    <span className="font-semibold">
                      ₹{shipping.toFixed(2)}
                    </span>

                  </div>

                  <div className="flex justify-between text-slate-600">

                    <span>Discount</span>

                    <span className="font-semibold text-rose-600">
                      -₹{discountAmount.toFixed(2)}
                    </span>

                  </div>

                  <div className="border-t pt-4">

                    <div className="flex justify-between">

                      <span className="text-lg font-semibold">
                        Total
                      </span>


                      <span className="text-3xl font-black text-indigo-600">
                        ₹{totalPrice.toLocaleString()}
                      </span>


                    </div>


                  </div>


                </div>

                <button
                  onClick={handleCheckout}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-4 font-semibold text-white transition hover:bg-indigo-700"
                >

                  <CreditCard size={18} />

                  Proceed to Checkout

                </button>



                <Link
                  to="/shop"
                  className="mt-3 flex w-full justify-center rounded-xl border border-slate-300 py-4 font-semibold text-slate-700 hover:bg-slate-50"
                >

                  Continue Shopping

                </Link>



              </div>


            </div>


          )}


        </div>


      </section>


      <Footer />

    </>
  );
}


export default Cart;