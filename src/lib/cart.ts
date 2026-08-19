import { useSyncExternalStore } from "react";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  qty: number;
};

const KEY = "tilehaus-cart";
let items: CartItem[] = [];
let loaded = false;
const listeners = new Set<() => void>();

function load() {
  if (loaded || typeof window === "undefined") return;
  loaded = true;
  try {
    items = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
  } catch {
    items = [];
  }
}

function persist() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(KEY, JSON.stringify(items));
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  load();
  listeners.add(cb);
  return () => listeners.delete(cb);
}

const emptySnapshot: CartItem[] = [];

export function useCart() {
  return useSyncExternalStore(
    subscribe,
    () => {
      load();
      return items;
    },
    () => emptySnapshot,
  );
}

export function addToCart(item: Omit<CartItem, "qty">, qty = 1) {
  load();
  const existing = items.find((i) => i.slug === item.slug);
  items = existing
    ? items.map((i) => (i.slug === item.slug ? { ...i, qty: i.qty + qty } : i))
    : [...items, { ...item, qty }];
  persist();
}

export function setQty(slug: string, qty: number) {
  load();
  items = qty <= 0 ? items.filter((i) => i.slug !== slug) : items.map((i) => (i.slug === slug ? { ...i, qty } : i));
  persist();
}

export function removeFromCart(slug: string) {
  setQty(slug, 0);
}

export const cartTotal = (list: CartItem[]) => list.reduce((s, i) => s + i.price * i.qty, 0);
export const cartCount = (list: CartItem[]) => list.reduce((s, i) => s + i.qty, 0);
export const inr = (n: number) => `₹${n.toLocaleString("en-IN")}`;
