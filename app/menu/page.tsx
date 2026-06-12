export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { CartDrawer } from "@/components/cart/cart-drawer";
import Header from "@/components/public/header";
import Footer from "@/components/public/footer";
import MenuClient from "@/components/public/menu-client";
import { getMenuPageData } from "@/lib/public-data";

export const metadata: Metadata = {
  title: "Menu — Deodar-Brew",
  description:
    "Browse our full menu, search by name, filter by category, and add items to your WhatsApp order.",
};

export default async function MenuPage() {
  const [categories, settings] = await getMenuPageData();

  const currencySymbol = settings?.currencySymbol ?? "₹";

  return (
    <>
      <Header />
      <main className="flex-1 bg-cedar-cream">
        <MenuClient categories={categories} currencySymbol={currencySymbol} />
      </main>
      <Footer />
      {settings && (
        <CartDrawer
          whatsappNumber={settings.whatsappNumber}
          cafeName={settings.cafeName}
          currencySymbol={currencySymbol}
        />
      )}
    </>
  );
}
