import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Footer from "../components/Footer";
import ProductCard from "../components/ProductCard";
import LoadingSkeleton from "../components/LoadingSkeleton";

import {
  Search,
  Package,
  Sparkles,
  ArrowUpDown,
} from "lucide-react";

function Shop() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        "https://fullstack-ecommerce-mern.onrender.com/api/products");

      setProducts(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const categories = useMemo(() => {
    return ["all", ...new Set(products.map((product) => product.category))];
  }, [products]);

  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "all" ||
        product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "price-low") return a.price - b.price;

      if (sortBy === "price-high") return b.price - a.price;

      if (sortBy === "rating") return 0;

      return a.name.localeCompare(b.name);
    });

    return sorted;
  }, [products, search, selectedCategory, sortBy]);

  return (
    <>
      <section className="min-h-screen bg-linear-to-br from-slate-100 via-white to-indigo-50 py-14">
        <div className="mx-auto max-w-7xl px-6">
          {/* Heading */}
          <div className="mb-14 text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-indigo-100 px-5 py-2 font-semibold text-indigo-700">
              <Sparkles size={18} />
              Premium Collection
            </div>

            <h1 className="mt-6 text-5xl font-extrabold text-gray-900 md:text-6xl">
              Discover Amazing Products
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-gray-500">
              Browse our curated collection of products with premium quality
              and unbeatable prices.
            </p>
          </div>

          {/* Search + Sort */}
          <div className="mb-10 grid gap-4 rounded-3xl bg-white p-5 shadow-lg lg:grid-cols-[1fr_auto] lg:items-center">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full rounded-2xl border border-gray-200 py-4 pl-14 pr-5 outline-none transition focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              />
            </div>

            <label className="flex items-center gap-2 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-600">
              <ArrowUpDown size={16} />

              Sort by

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-transparent outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </label>
          </div>

          {/* Categories */}
          <div className="mb-12 flex flex-wrap justify-center gap-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`rounded-full px-6 py-3 font-semibold capitalize transition-all duration-300 ${selectedCategory === category
                    ? "bg-indigo-600 text-white shadow-lg"
                    : "border border-gray-200 bg-white hover:bg-indigo-50"
                  }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Result */}
          <div className="mb-10 flex items-center gap-3">
            <div className="rounded-xl bg-indigo-100 p-3">
              <Package className="text-indigo-600" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {loading
                  ? "Loading products..."
                  : `${filteredProducts.length} Products Found`}
              </h2>

              <p className="text-gray-500">
                Explore our latest collection
              </p>
            </div>
          </div>

          {loading ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <LoadingSkeleton key={index} />
              ))}
            </div>
          ) : (
            <>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product._id}
                    product={product}
                  />
                ))}
              </div>

              {filteredProducts.length === 0 && (
                <div className="mt-10 rounded-3xl bg-white p-16 text-center shadow-lg">
                  <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-indigo-100">
                    <Package
                      size={42}
                      className="text-indigo-600"
                    />
                  </div>

                  <h2 className="text-3xl font-bold text-gray-800">
                    No Products Found
                  </h2>

                  <p className="mt-3 text-gray-500">
                    Try searching with another keyword or choose a different
                    category.
                  </p>

                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedCategory("all");
                      setSortBy("featured");
                    }}
                    className="mt-8 rounded-xl bg-indigo-600 px-6 py-3 font-semibold text-white transition hover:bg-indigo-700"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Shop;