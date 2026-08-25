# Vaishnavi Marble E-Commerce Setup Guide

## 🎯 Project Overview

This is a production-ready e-commerce website for Vaishnavi Marble built with:
- **Frontend**: React 19 + TypeScript + TanStack Start + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth + Storage)
- **Deployment**: Vercel
- **Admin Panel**: Secure protected routes with role-based access

## 📋 Prerequisites

Before you start, make sure you have:
- Node.js 18+ or Bun
- Git
- A Supabase account (free tier available at https://supabase.com)
- A Vercel account (free tier available at https://vercel.com)

## 🚀 Step 1: Supabase Setup

### 1.1 Create a Supabase Project

1. Go to https://app.supabase.com and sign up/login
2. Click **New Project**
3. Enter project details:
   - **Name**: `vaishnavi-marble`
   - **Database Password**: Create a strong password (save this!)
   - **Region**: Choose closest to India (e.g., Singapore)
4. Wait for project to initialize (2-3 minutes)

### 1.2 Get Your API Keys

1. Go to **Project Settings** → **API**
2. Copy:
   - **Project URL** (for `VITE_SUPABASE_URL`)
   - **Anon Key** (for `VITE_SUPABASE_ANON_KEY`)
3. Save these in `.env.local`

### 1.3 Create Storage Bucket

1. Go to **Storage** in left sidebar
2. Click **Create Bucket**
3. Name: `product-images`
4. Click **Create**
5. Click on `product-images` bucket → **Policies**
6. Click **New Policy** → **For authenticated users** → **Allow full access**
7. Click **For public users** → Allow SELECT only

### 1.4 Run Database Migrations

1. Go to **SQL Editor** in Supabase
2. Click **New Query**
3. Copy entire contents of `supabase/migrations/001_init_schema.sql`
4. Paste into SQL editor
5. Click **Run** (green button)
6. Wait for completion
7. Repeat for `supabase/migrations/002_seed_data.sql`

### 1.5 Create Admin User

1. Go to **Authentication** → **Users**
2. Click **Invite** or **Add user**
3. Email: `admin@vaishnavi.com`
4. Password: `Admin@123` (change in production!)
5. Click **Send invite** or **Create user**
6. User should appear in list

The admin user is automatically set to `role = 'admin'` by the seed migration.

## 💻 Step 2: Local Development Setup

### 2.1 Clone and Install

```bash
git clone https://github.com/vaishnavimarbel56/interior-design-source.git
cd interior-design-source
bun install
# or npm install
```

### 2.2 Environment Variables

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Update `.env.local` with your Supabase credentials:
```
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2.3 Start Development Server

```bash
bun dev
# or npm run dev
```

The app will be available at `http://localhost:5173`

## 🧪 Testing the Application

### Visit Key Pages

**Customer Website:**
- Homepage: http://localhost:5173/
- Products: http://localhost:5173/products
- Cart: http://localhost:5173/cart

**Admin Panel:**
- Login: http://localhost:5173/auth/login
- Dashboard: http://localhost:5173/admin (after login)
- Products Manager: http://localhost:5173/admin/products

### Login Credentials

```
Email: admin@vaishnavi.com
Password: Admin@123
```

## 📦 Project Structure

```
src/
├── routes/                    # File-based routing
│   ├── __root.tsx            # Root layout
│   ├── index.tsx             # Homepage
│   ├── products.tsx          # Products listing
│   ├── cart.tsx              # Shopping cart
│   ├── auth/
│   │   └── login.tsx         # Admin login
│   └── _authenticated/       # Protected routes
│       └── admin/
│           ├── index.tsx     # Dashboard
│           └── products.tsx  # Product management
├── lib/
│   ├── supabase-client.ts    # Supabase configuration
│   ├── types.ts              # TypeScript types
│   ├── hooks.ts              # React Query hooks
│   ├── utils.ts              # Utility functions
│   └── query-client.ts       # React Query setup
└── components/               # Reusable components

supabase/
├── migrations/
│   ├── 001_init_schema.sql   # Database schema
│   └── 002_seed_data.sql     # Sample data

public/
└── images/                    # Product images
```

## 🎨 Database Schema

### Tables

1. **profiles** - Admin users
2. **categories** - Product categories (Tiles, Sanitaryware, etc.)
3. **subcategories** - Category subdivisions
4. **brands** - Product brands (Kajaria, Somany, etc.)
5. **products** - Product catalog
6. **product_images** - Product photos
7. **product_specifications** - Product specs
8. **orders** - Customer orders
9. **order_items** - Order line items
10. **enquiries** - Bulk order enquiries
11. **site_settings** - Business configuration
12. **audit_logs** - Admin activity logging

## 🔐 Security

### Row Level Security (RLS)

All tables have RLS enabled with policies:
- **Public users** can read active products/categories
- **Public users** can create orders and enquiries
- **Only admins** can create/update/delete products
- **Only admins** can manage settings

### Environment Variables

⚠️ **NEVER commit `.env.local` to Git**

The `.gitignore` already excludes it.

## 🚢 Deployment to Vercel

### 1. Push to GitHub

```bash
git add .
git commit -m "feat: initial vaishnavi marble e-commerce"
git push origin main
```

### 2. Deploy to Vercel

1. Go to https://vercel.com/new
2. Select **Import GitHub Repository**
3. Find and select `interior-design-source`
4. Configure environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
5. Click **Deploy**

Vercel will automatically detect this is a TanStack Start app and configure the build.

### 3. Custom Domain (Optional)

1. In Vercel project settings → **Domains**
2. Add your custom domain
3. Follow DNS instructions

## 📱 Features Implemented

✅ Authentication with Supabase Auth
✅ Admin login and dashboard
✅ Product CRUD operations
✅ Shopping cart with localStorage
✅ Order creation
✅ Category and subcategory management
✅ Brand management
✅ Row Level Security
✅ Responsive design (mobile, tablet, desktop)
✅ TypeScript throughout
✅ React Query for data fetching
✅ Tailwind CSS styling
✅ SEO-friendly URLs
✅ Environment variable configuration

## 📝 Features to Implement Next

- [ ] Product images upload in admin
- [ ] Advanced product filtering
- [ ] Product search
- [ ] Order management in admin
- [ ] Enquiry management
- [ ] Site settings editor
- [ ] Payment gateway integration
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] Review/rating system
- [ ] Wishlist functionality
- [ ] Advanced image gallery

## 🐛 Troubleshooting

### Port Already in Use

```bash
# On Linux/Mac
lsof -i :5173
kill -9 <PID>

# On Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F
```

### Supabase Connection Issues

1. Check `.env.local` has correct values
2. Verify Supabase project is running
3. Check API key hasn't been revoked
4. Check browser console for specific errors

### Build Errors

```bash
# Clear cache and reinstall
rm -rf node_modules bun.lockb
bun install
bun run build
```

## 📞 Support

**Vaishnavi Marble Contact:**
- Phone: +91 93303 00408
- WhatsApp: +91 70039 48297
- Email: marblevaishnavi@gmail.com
- Address: Krishnapur Taruliya Main Road, Kolkata - 700102

## 📚 Documentation References

- [Supabase Docs](https://supabase.com/docs)
- [React Query Docs](https://tanstack.com/query/latest)
- [TanStack Start Docs](https://tanstack.com/start/latest)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs)

## 🎓 Next Steps

1. ✅ Read through this setup guide completely
2. ✅ Follow Supabase setup steps
3. ✅ Set up local development
4. ✅ Test the admin login
5. ✅ Browse products as a customer
6. ✅ Deploy to Vercel
7. ✅ Test on production URL

## 📄 License

Private project for Vaishnavi Marble, Kolkata.
