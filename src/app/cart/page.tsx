"use client";

import { useCart } from "@/contexts/CartContext";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { state, dispatch } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const handleQuantityChange = (
    productId: string,
    color: string,
    size: string,
    newQuantity: number
  ) => {
    if (newQuantity < 1) return;
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { productId, color, size, quantity: newQuantity },
    });
  };

  const handleRemoveItem = (productId: string, color: string, size: string) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: { productId, color, size },
    });
  };

  const handleCheckout = () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }
    // TODO: Implement checkout process
    router.push("/checkout");
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
        <button
          onClick={() => router.push("/products")}
          className="text-blue-600 hover:text-blue-800"
        >
          Continue shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8">
          {state.items.map((item) => (
            <div
              key={`${item.productId}-${item.color}-${item.size}`}
              className="flex items-center py-6 border-b"
            >
              <div className="relative h-24 w-24 flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover rounded-md"
                />
              </div>
              <div className="ml-4 flex-1">
                <h3 className="text-lg font-medium">{item.name}</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Color: {item.color} | Size: {item.size}
                </p>
                <div className="mt-2 flex items-center">
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.productId,
                        item.color,
                        item.size,
                        item.quantity - 1
                      )
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    -
                  </button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <button
                    onClick={() =>
                      handleQuantityChange(
                        item.productId,
                        item.color,
                        item.size,
                        item.quantity + 1
                      )
                    }
                    className="text-gray-500 hover:text-gray-700"
                  >
                    +
                  </button>
                  <button
                    onClick={() =>
                      handleRemoveItem(item.productId, item.color, item.size)
                    }
                    className="ml-4 text-red-600 hover:text-red-800"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="ml-4">
                <p className="text-lg font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="lg:col-span-4">
          <div className="bg-gray-50 rounded-lg p-6">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>${state.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span>Shipping</span>
              <span>Calculated at checkout</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between mb-4">
              <span className="font-medium">Total</span>
              <span className="font-medium">${state.total.toFixed(2)}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {session ? "Proceed to Checkout" : "Sign in to Checkout"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
