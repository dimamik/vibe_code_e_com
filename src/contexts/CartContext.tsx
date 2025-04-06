"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

interface CartItem {
  productId: string;
  name: string;
  price: number;
  color: string;
  size: string;
  quantity: number;
  image: string;
}

interface CartState {
  items: CartItem[];
  total: number;
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | {
      type: "REMOVE_ITEM";
      payload: { productId: string; color: string; size: string };
    }
  | {
      type: "UPDATE_QUANTITY";
      payload: {
        productId: string;
        color: string;
        size: string;
        quantity: number;
      };
    }
  | { type: "CLEAR_CART" };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_ITEM": {
      const existingItemIndex = state.items.findIndex(
        (item) =>
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      if (existingItemIndex > -1) {
        const newItems = [...state.items];
        newItems[existingItemIndex].quantity += action.payload.quantity;
        return {
          ...state,
          items: newItems,
          total: state.total + action.payload.price * action.payload.quantity,
        };
      }

      return {
        ...state,
        items: [...state.items, action.payload],
        total: state.total + action.payload.price * action.payload.quantity,
      };
    }
    case "REMOVE_ITEM": {
      const itemToRemove = state.items.find(
        (item) =>
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size
      );

      return {
        ...state,
        items: state.items.filter(
          (item) =>
            !(
              item.productId === action.payload.productId &&
              item.color === action.payload.color &&
              item.size === action.payload.size
            )
        ),
        total:
          state.total -
          (itemToRemove ? itemToRemove.price * itemToRemove.quantity : 0),
      };
    }
    case "UPDATE_QUANTITY": {
      const newItems = state.items.map((item) => {
        if (
          item.productId === action.payload.productId &&
          item.color === action.payload.color &&
          item.size === action.payload.size
        ) {
          return { ...item, quantity: action.payload.quantity };
        }
        return item;
      });

      return {
        ...state,
        items: newItems,
        total: newItems.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        ),
      };
    }
    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
      };
    default:
      return state;
  }
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });

  return (
    <CartContext.Provider value={{ state, dispatch }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
