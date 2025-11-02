# 🧠 DishaGB Hosting — Full Project Documentation  
**Author:** RudraCore Development Team  
**Date:** October 2025  
**Version:** 2.0 (Supabase Edition — No Payment Gateway)

---

## 🏷️ Overview  

**DishaGB Hosting** is a complete hosting management platform under **RudraCore**, built to simplify hosting plan management, order handling, and admin control.  
This rebuild focuses on clean architecture, removing all payment gateway dependencies, and using **Supabase** as the main backend.

---

## 🌐 Project Architecture  

| Area | Domain | Description |
|------|---------|-------------|
| **User Site** | `https://dishagb.shop` | The main public-facing website for users to explore hosting plans and place orders. |
| **Admin Panel** | `https://admin.dishagb.shop` | A dedicated interface for the admin to view and manage customer orders. |

---

## 🧰 Tech Stack  

| Layer | Technology Used | Description |
|-------|------------------|-------------|
| **Frontend** | Next.js (App Router) | Used for routing and building a modern UI. |
| **Backend / DB** | Supabase | Used for managing database, authentication, and API calls. |
| **UI Framework** | Tailwind CSS + ShadCN UI | Clean and responsive UI components. |
| **Hosting** | Vercel / Tsuki Cloud | For deploying both the user and admin websites. |
| **Version Control** | GitHub | Repository and workflow management. |

---

## 🧩 Features  

### 🛒 User-Side  
- **Hosting Plans Display:**  
  - Displays hosting options such as Minecraft, VPS, etc.  
  - Each plan has details like RAM, CPU, disk, bandwidth, and pricing.

- **Add to Cart System:**  
  - Each plan has an **Add to Cart** button.  
  - After adding, it converts into a quantity counter `( - 1 + )`.  
  - When quantity is reduced to 0, it returns to “Add to Cart”.

- **Order Placement (Without Payment):**  
  - Orders are directly stored in the `customer_orders` table in Supabase.  
  - Admins can review and process orders manually.

- **Order Confirmation:**  
  - Displays an animation or success alert after an order is successfully submitted.

- **Billing Page:**  
  - Displays summary, pricing, and customer details.  
  - Fully responsive and visually consistent.

- **Discord Link:**  
  - “Join Discord” button connects users to  
    ➜ `https://discord.gg/bdeKpxwEnj`

---

### 🧑‍💼 Admin Panel  
- **Supabase Integration:**  
  - Fetches all customer orders from `customer_orders`.  
  - Supports live manual refreshing for new orders.

- **Pinned Header:**  
  - Header stays visible while scrolling for better control.

- **Order Management:**  
  - Displays orders in structured cards or tables.  
  - Shows key information: customer name, plan, date, and status.

- **Clean UI:**  
  - Uses a simple and minimal layout for quick management.  
  - Fully responsive on all screen sizes.

- **Optimized Build:**  
  - All unnecessary files and scripts are removed.  
  - No external payment system is included.

---

## 💽 Database (Supabase Schema)

| Table | Description |
|--------|--------------|
| **customer_orders** | Contains all user orders including plan details, date, and customer info. |
| **users** | (Optional) Stores registered user data. |
| **admin_logs** | (Optional) Logs admin updates and order actions. |

---

## 🔧 Setup Instructions

### Requirements
- Node.js 20 or higher  
- Supabase project  
- Git installed

### Installation
```bash
git clone https://github.com/rudracore/dishagb-hosting.git
cd dishagb-hosting
npm install
## ⚙️ Environment Configuration

Create a `.env.local` file in the root of your project and add the following variables:

```
NEXT_PUBLIC_SUPABASE_URL=https://icyirqdvhannozbtxwej.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljeWlycWR2aGFubm96YnR4d2VqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1NjIzODUsImV4cCI6MjA3NTEzODM4NX0.K__5-0mSsR0vRW2FffM22IfbELkSqG-fu4vMTUZBMEw
```

---

## 🚀 Run Development Server

To start the local development server, run:
```
npm run dev
```

---

## 🏗️ Build and Deploy

To build and deploy the project:
```
npm run build
npm start
```

---

## 📊 Deployment Flow

| Step | Action |
|------|---------|
| 1️⃣ | Connect both the **user** and **admin** sites to the same Supabase project. |
| 2️⃣ | Deploy the **user** site to `dishagb.shop`. |
| 3️⃣ | Deploy the **admin** site to `admin.dishagb.shop`. |
| 4️⃣ | Ensure Supabase connection is active and order sync is working. |
| 5️⃣ | Finalize the deployment using **Vercel** or **Tsuki Cloud**. |

---

## 🧹 Optimization Summary

- Removed all payment gateway integrations.  
- Cleaned unused files and unnecessary imports.  
- Optimized Supabase queries and state management.  
- Reduced frontend load times.  
- Improved consistency and responsiveness across all pages.  

---

## 🪄 Planned Additions

- Real-time order tracking through **Supabase Realtime API**.  
- Dashboard analytics for total orders and plan trends.  
- Optional user login and order history.  
- Basic invoice generation (without payments).  

---

## 👨‍💻 Credits

**Developed by:** RudraCore Team  
**Maintained by:** Akhil Narra & Team  
**Powered by:** Tsuki Cloud & Supabase
