# Planify - Premier Event Management Platform

Planify is a modern, full-stack event management platform connecting users with verified agencies for weddings, festivals, and corporate events. Built with performance and aesthetics in mind, it features role-based access control, real-time booking management, and a seamless responsive design.

![Planify Preview](https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=600&fit=crop)

## 🚀 Features

- **Role-Based Authentication**: Custom dashboards for **Customers** (manage bookings) vs **Agencies** (manage services & revenue).
- **Agency Marketplace**: Search and filter agencies by location, price, and category.
- **Real-time Booking System**: Users can book events; Agencies can approve/reject them instantly.
- **Dynamic Content**: Data-driven festival recommendations and trending agency lists.
- **Secure Payments (Simulated)**: Integrated checkout flow with financial tracking.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS & Lucide Icons
- **Database**: PostgreSQL (via [Supabase](https://supabase.com/))
- **ORM**: Prisma
- **Auth**: NextAuth.js
- **Deployment**: Vercel

## 📦 Getting Started

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/planify.git
    cd planify
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up Environment Variables:**
    Create a `.env` file in the root directory:
    ```env
    DATABASE_URL="your_supabase_postgres_url"
    DIRECT_URL="your_supabase_direct_url"
    NEXTAUTH_SECRET="your_secret_key"
    NEXTAUTH_URL="http://localhost:3000"
    ```

4.  **Run Database Migrations:**
    ```bash
    npx prisma generate
    npx prisma db push
    ```

5.  **Start the development server:**
    ```bash
    npm run dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🤝 Contributing

This project is a personal portfolio piece. Suggestions and improvements are welcome!

---
*Built with ❤️ by [Your Name]*
