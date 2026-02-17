import { getSession } from "@/lib/get-session";
import { redirect } from "next/navigation";
import { getAllProducts } from "@/lib/server-db";
import AdminForm from "./AdminForm";

export const dynamic = 'force-dynamic';

export default async function AdminPage() {
    const session = await getSession();

    if (!session?.user) {
        redirect("/admin/login");
    }

    let products;
    try {
        products = await getAllProducts();
    } catch (error) {
        console.error("Failed to load products in admin:", error);
        products = [];
    }

    return <AdminForm products={products} />;
}
