import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format price with Indian Rupee
export function formatPrice(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount)
}

// Calculate discount percentage
export function calculateDiscountPercentage(price: number, mrp: number): number {
  if (mrp === 0) return 0
  return Math.round(((mrp - price) / mrp) * 100)
}

// Generate slug from text
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

// Format date
export function formatDate(date: string | Date): string {
  return new Intl.DateTimeFormat('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(date))
}

// WhatsApp message helper
export function waHref(phone: string, message?: string): string {
  const cleaned = phone.replace(/\D/g, '')
  const baseUrl = `https://wa.me/${cleaned}`
  if (!message) return baseUrl
  return `${baseUrl}?text=${encodeURIComponent(message)}`
}

// Truncate text
export function truncate(text: string, length: number = 100): string {
  if (text.length <= length) return text
  return text.substring(0, length) + '...'
}

// Get initials from name
export function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)
}
