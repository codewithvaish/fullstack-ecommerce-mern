import { Link, useLocation, useNavigate } from "react-router-dom";
import { ShoppingCart, Heart, UserCircle, LogOut, ShoppingBag } from "lucide-react";
import { useApp } from "../context/AppContext";

function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const { currentUser, cartCount, wishlistCount, logoutUser } = useApp();

  const navLink = (path) =>
    `transition font-medium ${
      location.pathname === path
        ? "text-indigo-600"
        : "text-slate-700 hover:text-indigo-600"
    }`;

  const handleLogout = () => {
    logoutUser();
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-indigo-600 p-2.5 text-white shadow-lg shadow-indigo-200">
            <ShoppingBag size={22} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-slate-900 sm:text-2xl">
              ShopHub
            </h1>
            <p className="-mt-1 text-xs text-slate-500">Full Stack MERN Store</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          <Link to="/" className={navLink("/")}>Home</Link>
          <Link to="/shop" className={navLink("/shop")}>Shop</Link>
          <Link to="/wishlist" className={navLink("/wishlist")}>Wishlist</Link>
          <Link to="/cart" className={navLink("/cart")}>Cart</Link>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link to="/wishlist" className="relative rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600">
            <Heart size={22} />
            {wishlistCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rose-500 px-1 text-[11px] font-bold text-white">
                {wishlistCount}
              </span>
            )}
          </Link>

          <Link to="/cart" className="relative rounded-full p-2 text-slate-700 transition hover:bg-slate-100 hover:text-indigo-600">
            <ShoppingCart size={22} />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-600 px-1 text-[11px] font-bold text-white">
                {cartCount}
              </span>
            )}
          </Link>

          {!currentUser ? (
            <Link
              to="/login"
              className="rounded-full bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700"
            >
              Login
            </Link>
          ) : (
            <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-2 py-1.5">
              <Link to="/profile" className="flex items-center gap-2 rounded-full px-2 py-1 transition hover:bg-white">
                <UserCircle className="text-indigo-600" size={30} />
                <span className="hidden max-w-28 truncate text-sm font-semibold text-slate-700 sm:block">
                  {currentUser.name}
                </span>
              </Link>
              <button
                onClick={handleLogout}
                className="rounded-full p-2 text-slate-500 transition hover:bg-white hover:text-rose-500"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;