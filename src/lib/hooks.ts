import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from './supabase-client';
import type { Product, Category, Subcategory, Brand, CartItem } from './types';
import { useCallback, useState, useEffect } from 'react';

// ============================================
// PRODUCTS HOOKS
// ============================================

export function useProducts(categorySlug?: string) {
  return useQuery({
    queryKey: ['products', categorySlug],
    queryFn: async () => {
      let query = supabase
        .from('products')
        .select(
          `
          *,
          category:category_id (*),
          subcategory:subcategory_id (*),
          brand:brand_id (*),
          images:product_images (id, image_url, is_primary),
          specifications:product_specifications (*)
        `
        )
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (categorySlug) {
        query = query.eq('category.slug', categorySlug);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as any[];
    },
  });
}

export function useProduct(slug: string) {
  return useQuery({
    queryKey: ['product', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('products')
        .select(
          `
          *,
          category:category_id (*),
          subcategory:subcategory_id (*),
          brand:brand_id (*),
          images:product_images (*),
          specifications:product_specifications (*)
        `
        )
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data;
    },
  });
}

// ============================================
// CATEGORIES HOOKS
// ============================================

export function useCategories() {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (error) throw error;
      return data as Category[];
    },
  });
}

export function useCategory(slug: string) {
  return useQuery({
    queryKey: ['category', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .single();

      if (error) throw error;
      return data as Category;
    },
  });
}

// ============================================
// SUBCATEGORIES HOOKS
// ============================================

export function useSubcategories(categoryId?: string) {
  return useQuery({
    queryKey: ['subcategories', categoryId],
    queryFn: async () => {
      let query = supabase
        .from('subcategories')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true });

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as Subcategory[];
    },
  });
}

// ============================================
// BRANDS HOOKS
// ============================================

export function useBrands() {
  return useQuery({
    queryKey: ['brands'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('brands')
        .select('*')
        .eq('is_active', true)
        .order('name', { ascending: true });

      if (error) throw error;
      return data as Brand[];
    },
  });
}

// ============================================
// ORDERS HOOKS
// ============================================

export function useCreateOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (orderData: any) => {
      const { data, error } = await supabase
        .from('orders')
        .insert([orderData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
}

// ============================================
// ENQUIRIES HOOKS
// ============================================

export function useCreateEnquiry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (enquiryData: any) => {
      const { data, error } = await supabase
        .from('enquiries')
        .insert([enquiryData])
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['enquiries'] });
    },
  });
}

// ============================================
// CART HOOKS
// ============================================

const CART_STORAGE_KEY = 'vaishnavi_marble_cart';

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  const saveCart = useCallback((items: CartItem[]) => {
    setCart(items);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  }, []);

  const addItem = useCallback(
    (item: CartItem) => {
      setCart((prevCart) => {
        const existingItem = prevCart.find(
          (i) => i.product_id === item.product_id
        );

        let newCart;
        if (existingItem) {
          newCart = prevCart.map((i) =>
            i.product_id === item.product_id
              ? { ...i, quantity: i.quantity + item.quantity }
              : i
          );
        } else {
          newCart = [...prevCart, item];
        }

        saveCart(newCart);
        return newCart;
      });
    },
    [saveCart]
  );

  const removeItem = useCallback(
    (productId: string) => {
      setCart((prevCart) => {
        const newCart = prevCart.filter((i) => i.product_id !== productId);
        saveCart(newCart);
        return newCart;
      });
    },
    [saveCart]
  );

  const updateQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId);
        return;
      }

      setCart((prevCart) => {
        const newCart = prevCart.map((i) =>
          i.product_id === productId ? { ...i, quantity } : i
        );
        saveCart(newCart);
        return newCart;
      });
    },
    [removeItem, saveCart]
  );

  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return {
    cart,
    isLoading,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
  };
}
