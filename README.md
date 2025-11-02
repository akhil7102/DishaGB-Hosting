# 🧠 DishaGB Hosting — Full Project Documentation  
**Author:** RudraCore Development Team  
**Date:** 23rd Oct 2025  
**Version:** 2.0 (0auth + Supabase Edition)

---

## 🏷️ Overview  

**DishaGB Hosting** is a modern web hosting platform built under **RudraCore** and powered by the latest stack — **Next.js**, **Supabase**, and **Razorpay**.  

This update marks a **major overhaul** of the entire system:  
- We’ve restructured the **admin dashboard**,  
- Enhanced the **UI/UX**,  
- Added **live order management**,  
- Integrated a **secure Razorpay checkout**, and  
- Optimized the codebase by removing unused files and documentation.  

The project is now lighter, faster, and more professional — ready for deployment on production domains.

---

## 🌐 Project Architecture  

| Area | Domain | Description |
|------|---------|-------------|
| **User Site** | `https://dishagb.shop` | Main website for customers to browse hosting plans, place orders, and manage billing. |
| **Admin Panel** | `https://admin.dishagb.shop` | Secure dashboard for managing customer orders and payments fetched directly from Supabase. |

---

## 🧰 Tech Stack  

| Layer | Technology Used | Description |
|-------|------------------|-------------|
| **Frontend** | Next.js (App Router) | Core UI framework for both user and admin sites |
| **Backend / DB** | Supabase | Stores user accounts, billing details, and customer orders |
| **Payment Gateway** | Razorpay | Handles all transactions and payment verification |
| **UI Components** | Tailwind CSS + ShadCN UI | Responsive UI system with consistent design |
| **Hosting** | Vercel / Tsuki Cloud | Frontend hosting with automatic builds |
| **Version Control** | GitHub | Repository management and deployment tracking |

---

## 🧩 Major Features  

### 🛒 User-Side  
- **Responsive Hosting Plans:** Dynamic cards for all services — Minecraft Hosting, VPS Hosting, etc.  
- **Cart System:**  
  - Each plan includes an **Add to Cart** button.  
  - Once added, it changes to a counter system `( - 1 + )`.  
  - Clicking **+** adds more items; **-** removes them.  
  - If count = 0 → reverts back to “Add to Cart”.  
- **Razorpay Checkout:**  
  - Users can securely complete their payment.  
  - After order confirmation, the order is stored in `customer_orders` table.  
- **Order Success Animation:**  
  - A green tick animation appears after successful order placement.  
- **Billing Information Page (Redesigned):**  
  - Fully aligned layout  
  - Clean and professional formatting  
  - Easy-to-read payment and contact details  
- **Discord Integration:**  
  - Every “Join Discord” button links to  
    ➜ `https://discord.gg/bdeKpxwEnj`

---

### 🧑‍💼 Admin Panel  
- **Live Order Fetch:**  
  - Automatically pulls new entries from the Supabase `customer_orders` table.  
- **Refresh Functionality:**  
  - A custom animation + button allows admins to manually refresh the dashboard to fetch new orders instantly.  
- **Pinned Header:**  
  - The header bar remains fixed while scrolling, improving accessibility.  
- **Optimized Layout:**  
  - Clear order display  
  - Easy filtering and sorting of new orders  
  - Mobile and tablet responsive  
- **Lightweight Build:**  
  - All unused files, components, and test documentation were removed.  
  - Final build size optimized under **99 MB** for better performance.  

---

## 💽 Database (Supabase Structure)

| Table | Description |
|--------|--------------|
| **customer_orders** | Stores customer name, plan type, amount, and payment ID |
| **users** | Stores user credentials and basic information |
| **transactions** | Logs all Razorpay transaction data for admin verification |

---

## 💳 Payment Integration (Razorpay)

- Secure payment API integrated directly into checkout.
- Each order’s payment ID is stored in Supabase.
- Razorpay callback verifies success before confirming the order.

---

## 🔧 Developer Setup

### Prerequisites
- Node.js 20+
- Git
- Supabase account
- Razorpay API keys

### Installation
```bash
git clone https://github.com/rudracore/dishagb-hosting.git
cd dishagb-hosting
npm install
