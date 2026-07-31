import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";

import {
  Star,
  Minus,
  Plus,
  ShoppingCart,
  Heart,
  ArrowLeft,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const { addToCart, toggleWishlist, isWishlisted } = useApp();

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id]);

  const fetchProduct = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await axios.get(
        `http://localhost:5000/api/products/${id}`
      );

      setProduct(response.data);
    } catch (err) {
      console.log(err);
      setError("Failed to load product details.");
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate("/cart");
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <h1 className="animate-pulse text-3xl font-bold text-slate-700">
          Loading Product...
        </h1>
      </div>
    );
  }

  if (error) {
    return (
      <>
        <section className="min-h-screen bg-gray-50 py-12">
          <div className="mx-auto max-w-4xl px-6">
            <div className="rounded-3xl bg-white p-10 text-center shadow-lg">
              <h1 className="text-3xl font-bold text-gray-900">
                {error}
              </h1>

              <button
                onClick={() => navigate("/shop")}
                className="mt-6 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
              >
                Back to Shop
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </>
    );
  }

  if (!product) return null;

  const wishlisted = isWishlisted(product._id);

  return (
    <>
      <section className="min-h-screen bg-linear-to-b from-slate-50 to-white py-12">
        <div className="mx-auto max-w-6xl px-6">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50"
          >
            <ArrowLeft size={16} />
            Back
          </button>

          <div className="grid gap-10 rounded-3xl bg-white p-6 shadow-xl md:grid-cols-2 md:p-8">
            {/* Product Image */}
            <div className="flex items-center justify-center rounded-3xl bg-slate-50 p-8">
              <img
                src={product.image}
                alt={product.name}
                className="h-96 object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>

            {/* Product Info */}
            <div>
              <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold capitalize text-indigo-700">
                {product.category}
              </span>

              <h1 className="mt-4 text-3xl font-black text-gray-900 md:text-4xl">
                {product.name}
              </h1>

              {/* Temporary Rating */}
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1">
                  <Star fill="gold" color="gold" size={18} />
                  <span className="font-semibold">4.5</span>
                </div>

                <span className="text-gray-500">
                  New Product
                </span>
              </div>

              <div className="mt-6 flex items-end gap-4">
                <h2 className="text-4xl font-black text-indigo-600">
                  ₹{Number(product.price).toLocaleString()}
                </h2>

                <span className="pb-1 text-gray-400 line-through">
                  ₹{(product.price * 1.35).toFixed(2)}
                </span>
              </div>

              <p className="mt-6 leading-7 text-gray-600">
                {product.description}
              </p>

              {/* Benefits */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <Truck className="mx-auto text-indigo-600" size={20} />
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Free Delivery
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <RotateCcw className="mx-auto text-indigo-600" size={20} />
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Easy Return
                  </p>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-center">
                  <ShieldCheck className="mx-auto text-indigo-600" size={20} />
                  <p className="mt-2 text-sm font-semibold text-slate-700">
                    Secure Payment
                  </p>
                </div>
              </div>

              {/* Quantity */}
              <div className="mt-8">
                <p className="mb-3 text-sm font-semibold text-slate-700">
                  Quantity
                </p>

                <div className="flex w-fit items-center rounded-2xl border border-slate-200 bg-slate-50">
                  <button
                    onClick={() =>
                      setQuantity((prev) => (prev > 1 ? prev - 1 : 1))
                    }
                    className="px-4 py-3 hover:bg-slate-100"
                  >
                    <Minus size={18} />
                  </button>

                  <span className="min-w-14 px-5 text-center font-semibold">
                    {quantity}
                  </span>

                  <button
                    onClick={() => setQuantity((prev) => prev + 1)}
                    className="px-4 py-3 hover:bg-slate-100"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <button
                  onClick={handleAddToCart}
                  className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-4 font-semibold text-white transition hover:bg-indigo-700"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>

                <button
                  onClick={() => toggleWishlist(product)}
                  className={`flex items-center justify-center gap-2 rounded-xl border px-6 py-4 font-semibold transition ${
                    wishlisted
                      ? "border-rose-500 bg-rose-50 text-rose-600"
                      : "border-indigo-600 text-indigo-600 hover:bg-indigo-50"
                  }`}
                >
                  <Heart
                    size={18}
                    className={
                      wishlisted ? "fill-rose-500 text-rose-500" : ""
                    }
                  />
                  {wishlisted
                    ? "Wishlist Added"
                    : "Add to Wishlist"}
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                className="mt-4 w-full rounded-xl border border-slate-300 px-6 py-4 font-semibold text-slate-700 transition hover:bg-slate-50"
              >
                Buy Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default ProductDetails;