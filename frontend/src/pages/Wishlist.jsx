import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Trash2 } from "lucide-react";
import Footer from "../components/Footer";
import { useApp } from "../context/AppContext";

function Wishlist() {
  const { wishlist, toggleWishlist, addToCart } = useApp();

  return (
    <>
      <section className="min-h-screen bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-6">

          <h1 className="mb-10 text-4xl font-bold">
            My Wishlist
          </h1>


          {wishlist.length === 0 ? (

            <div className="rounded-3xl bg-white p-14 text-center shadow-lg">

              <Heart
                size={50}
                className="mx-auto mb-5 text-red-500"
              />

              <h2 className="text-3xl font-bold">
                Wishlist is Empty
              </h2>

              <p className="mt-3 text-gray-500">
                Save your favourite products here.
              </p>


              <Link
                to="/shop"
                className="mt-8 inline-block rounded-xl bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
              >
                Go Shopping
              </Link>

            </div>


          ) : (

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">


              {wishlist.map((product) => (

                <div
                  key={product._id}
                  className="rounded-3xl bg-white p-5 shadow-md"
                >


                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-56 w-full object-contain"
                  />



                  <h2 className="mt-5 line-clamp-2 font-bold">
                    {product.name}
                  </h2>



                  <p className="mt-4 text-2xl font-bold text-indigo-600">
                    ₹{product.price.toLocaleString()}
                  </p>



                  <div className="mt-6 grid grid-cols-2 gap-3">


                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 text-white"
                    >

                      <ShoppingCart size={18}/>

                      Cart

                    </button>



                    <button
                      onClick={() => toggleWishlist(product)}
                      className="flex items-center justify-center gap-2 rounded-xl border border-red-500 py-3 text-red-500"
                    >

                      <Trash2 size={18}/>

                      Remove

                    </button>


                  </div>


                </div>


              ))}


            </div>


          )}


        </div>
      </section>


      <Footer />

    </>
  );
}


export default Wishlist;