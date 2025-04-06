"use client";

import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";
import { ShoppingCart, User } from "lucide-react";
import { useCart } from "@/contexts/CartContext";

export default function Navbar() {
  const { data: session } = useSession();
  const { state } = useCart();

  const itemCount = state.items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link
              href="/"
              className="text-xl font-bold text-gray-800 hover:text-gray-600"
            >
              Vibe Code Shop
            </Link>
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/products"
                className="text-gray-600 hover:text-gray-800 px-3 py-2"
              >
                Products
              </Link>
              {session?.user?.isAdmin && (
                <Link
                  href="/admin"
                  className="text-gray-600 hover:text-gray-800 px-3 py-2"
                >
                  Admin Panel
                </Link>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Link
              href="/cart"
              className="text-gray-600 hover:text-gray-800 relative"
            >
              <ShoppingCart className="h-6 w-6" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
            {session ? (
              <div className="flex items-center space-x-4">
                <Link
                  href="/profile"
                  className="text-gray-600 hover:text-gray-800 flex items-center space-x-1"
                >
                  <User className="h-5 w-5" />
                  <span>{session.user?.name || session.user?.email}</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-800 px-3 py-2"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="text-gray-600 hover:text-gray-800 px-3 py-2"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
