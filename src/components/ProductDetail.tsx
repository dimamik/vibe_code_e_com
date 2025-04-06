"use client";

import { useState } from "react";
import Image from "next/image";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  colors: string[];
  sizes: string[];
}

interface ProductDetailProps {
  product: Product;
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [quantity, setQuantity] = useState(1);
  const { dispatch } = useCart();
  const router = useRouter();

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_ITEM",
      payload: {
        productId: product.id,
        name: product.name,
        price: product.price,
        color: selectedColor,
        size: selectedSize,
        quantity,
        image: product.image,
      },
    });
    router.push("/cart");
  };

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        <div className="lg:max-w-lg lg:self-start">
          <div className="relative h-[400px] w-full overflow-hidden rounded-lg">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover object-center"
              priority
            />
          </div>
        </div>

        <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            {product.name}
          </h1>

          <div className="mt-3">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${product.price}
            </p>
          </div>

          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-900">Description</h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">{product.description}</p>
            </div>
          </div>

          <div className="mt-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="mt-4 flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`relative flex cursor-pointer items-center justify-center rounded-full p-1 focus:outline-none ${
                      selectedColor === color ? "ring-2 ring-blue-500" : ""
                    }`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <span
                      className="h-8 w-8 rounded-full border border-gray-200"
                      style={{ backgroundColor: color }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Size</h3>
              </div>
              <div className="mt-2 grid grid-cols-4 gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    className={`flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase ${
                      selectedSize === size
                        ? "border-transparent bg-blue-600 text-white"
                        : "border-gray-300 text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              </div>
              <div className="mt-2">
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-20 rounded-md border border-gray-300 px-3 py-2 text-center text-sm"
                />
              </div>
            </div>

            <div className="mt-10 flex">
              <button
                type="button"
                onClick={handleAddToCart}
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-blue-600 px-8 py-3 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
