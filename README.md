# DigitalStore - Premium Digital Products Marketplace

A high-performance, responsive web application for selling digital products. Built with Next.js 14+, Tailwind CSS, and Framer Motion.

## Features

- **Product Showcase**: Beautiful grid layout with instant search and filtering.
- **Product Details**: Rich "blog-style" product pages with markdown support.
- **Admin Dashboard**: Secure interface to add new products (`/admin`).
- **Gumroad Integration**: Seamless "Buy Now" links to external payment.
- **Premium Design**: Dark mode by default, glassmorphism effects, and smooth animations.
- **SEO Optimized**: Metadata and semantic HTML structure.

## 🔐 How to Login as Admin (Vercel / Production)

1.  This application is secured with a password-based login.
2.  Normal visitors **cannot** access the admin area. They only see the products.
3.  To access the admin area:
    -   Go to `https://your-site.vercel.app/admin` (or `/admin/login`).
    -   Enter your **Admin Password**.

### Setting the Password
When deploying to Vercel, you must set the following **Environment Variables**:

| Variable Name | Description | Example |
| :--- | :--- | :--- |
| `ADMIN_PASSWORD` | The password you will use to login. | `MySecretPass123` |
| `JWT_SECRET` | A long random string for securing sessions. | `random-string-x83ns9...` |

**Without these variables, the default password is `admin123`.** Please change it for production!

## Getting Started (Local Development)

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) to view the site.

3.  **Login as Admin**:
    -   Click the "Admin" link in the footer or go to `/admin`.
    -   Default Local Password: `admin123`

4.  **Add Products**:
    -   Fill out the form (Title, Price, Gumroad Link, Image URL, Description).
    -   Click "Create Product".

## Tech Stack

-   **Framework**: Next.js (App Router)
-   **Styling**: Tailwind CSS, Shadcn/ui (style)
-   **Animations**: Framer Motion
-   **Icons**: Lucide React
-   **Data**: Local JSON file (`src/data/mock-db.json`) - *Note: On Vercel, file system writes are temporary. For a permanent store, connect a database like Supabase/Postgres.*

## Customization

-   **Colors**: Edit `src/app/globals.css` CSS variables.
-   **Components**: reusable UI components in `src/components/ui`.

Enjoy building!
