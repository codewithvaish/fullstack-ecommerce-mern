import { Link } from "react-router-dom";
import {
  ShoppingCart,
  Heart,
  Eye,
  Star,
} from "lucide-react";
import { useApp } from "../context/AppContext";

function ProductCard({ product }) {
  const {
    addToCart,
    toggleWishlist,
    isWishlisted,
  } = useApp();

  const wishlisted = isWishlisted(product._id);

  return (
    <div className="group overflow-hidden rounded-3xl bg-white shadow-md transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl">
      {/* Image */}
      <div className="relative overflow-hidden bg-linear-to-br from-gray-50 to-gray-100">
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="h-72 w-full object-contain p-8 transition-transform duration-500 group-hover:scale-110"
          />
        </Link>

        <span className="absolute left-4 top-4 rounded-full bg-indigo-600 px-3 py-1 text-xs capitalize text-white shadow">
          {product.category}
        </span>

        <button
          onClick={() => toggleWishlist(product)}
          className="absolute right-4 top-4 rounded-full bg-white p-2.5 shadow-lg transition hover:bg-red-50"
          aria-label="Toggle wishlist"
        >
          <Heart
            size={18}
            className={
              wishlisted
                ? "fill-red-500 text-red-500"
                : "text-gray-500 hover:text-red-500"
            }
          />
        </button>

        <div className="absolute bottom-4 left-4 rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white">
          SALE
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <Link to={`/product/${product._id}`}>
          <h2 className="h-14 overflow-hidden text-lg font-bold text-gray-900 transition group-hover:text-indigo-600">
            {product.name}
          </h2>
        </Link>

        <p className="mt-3 h-10 overflow-hidden text-sm text-gray-500">
          {product.description}
        </p>

        {/* Rating (Temporary) */}
        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <Star size={18} fill="gold" color="gold" />
            <span className="font-semibold">4.5</span>
          </div>

          <span className="text-sm text-gray-400">
            New Product
          </span>
        </div>

        {/* Price */}
        <div className="mt-6 flex items-center gap-3">
          <span className="text-3xl font-bold text-indigo-600">
            ₹{Number(product.price).toLocaleString()}
          </span>

          <span className="text-gray-400 line-through">
            ₹{(product.price * 1.35).toFixed(2)}
          </span>
        </div>

        {/* Buttons */}
        <div className="mt-7 grid grid-cols-2 gap-3">
          <button
            onClick={() => addToCart(product)}
            className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white transition hover:bg-indigo-700"
          >
            <ShoppingCart size={18} />
            Cart
          </button>

          <Link
            to={`/product/${product._id}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-gray-300 py-3 font-semibold transition hover:bg-gray-100"
          >
            <Eye size={18} />
            View
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;