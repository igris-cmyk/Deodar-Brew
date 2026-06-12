export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BadgePercent,
  ClipboardList,
  Clock,
  ImageIcon,
  MapPin,
  MessageCircle,
  Phone,
  QrCode,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Tag,
} from "lucide-react";
import AnimatedSection from "@/components/public/animated-section";
import BusinessTypes from "@/components/public/business-types";
import FeaturedMenuCard from "@/components/public/featured-menu-card";
import FeatureCard from "@/components/public/feature-card";
import Footer from "@/components/public/footer";
import Header from "@/components/public/header";
import MenuPreviewCard from "@/components/public/menu-preview-card";
import OrderFlow from "@/components/public/order-flow";
import PremiumCta from "@/components/public/premium-cta";
import SectionHeading from "@/components/public/section-heading";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { isSvgImageUrl, resolveMenuImageUrl } from "@/lib/image-fallbacks";
import { getHomePageData } from "@/lib/public-data";

const heroProofSteps = [
  { icon: ClipboardList, label: "Menu browsing" },
  { icon: ShoppingBag, label: "Cart" },
  { icon: MessageCircle, label: "WhatsApp order" },
  { icon: ShieldCheck, label: "Admin updates" },
];

function getFeaturedMenuGridClass(count: number) {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 3) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  if (count === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  if (count === 5) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}

function getGalleryGridClass(count: number) {
  if (count <= 1) return "grid-cols-1";
  if (count === 2) return "grid-cols-1 sm:grid-cols-2";
  if (count === 4) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4";
  if (count === 5) return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-5";
  return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
}

const adminFeatures = [
  {
    icon: ClipboardList,
    title: "Menu and categories",
    description:
      "A business can add items, change prices, reorder categories, and mark availability.",
  },
  {
    icon: Tag,
    title: "Daily offers",
    description:
      "Counter specials, combos, and seasonal items can be updated without touching code.",
  },
  {
    icon: ImageIcon,
    title: "Gallery and cafe info",
    description:
      "Photos, about copy, phone, WhatsApp number, hours, address, and map links are settings-driven.",
  },
  {
    icon: ShieldCheck,
    title: "Protected dashboard",
    description:
      "Admin routes stay behind the existing authentication and session logic.",
  },
];

export default async function HomePage() {
  const [featuredItems, offers, settings, gallery] = await getHomePageData();

  const currencySymbol = settings?.currencySymbol ?? "Rs.";
  const cafeName = settings?.cafeName ?? "Deodar-Brew";
  const previewItems = featuredItems.slice(0, 2);
  const previewTotal = previewItems
    .slice(0, 2)
    .reduce((total, item) => total + item.price, 0);
  const whatsappUrl = settings?.whatsappNumber
    ? `https://wa.me/${settings.whatsappNumber.replace(/\D/g, "")}`
    : null;

  return (
    <>
      <Header />

      <main className="flex-1 overflow-hidden">
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(214,144,66,0.26),transparent_25rem),radial-gradient(circle_at_76%_6%,rgba(101,118,87,0.18),transparent_28rem),linear-gradient(115deg,rgba(255,253,248,0.92)_0%,rgba(255,248,236,0.74)_48%,rgba(246,226,199,0.55)_100%)]" />
          <div className="absolute right-0 top-0 hidden h-full w-[38%] bg-[linear-gradient(160deg,rgba(34,16,11,0.09),rgba(214,144,66,0.03))] lg:block" />
          <div className="relative mx-auto grid max-w-6xl gap-8 container-px py-10 md:grid-cols-[0.98fr_0.86fr] md:items-center md:py-14 lg:py-16">
            <div className="motion-fade-up space-y-5">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/75 bg-white/80 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.18em] text-cedar-caramel shadow-[0_12px_30px_rgba(28,13,8,0.07)] backdrop-blur-xl">
                <QrCode className="h-4 w-4 text-cedar-green" />
                Practical food ordering website
              </div>

              <div className="space-y-4">
                <h1 className="font-heading text-balance text-[clamp(2.35rem,5.8vw,3.95rem)] font-semibold leading-[1.01] tracking-[-0.03em] text-cedar-espresso">
                  A clean ordering website for modern food businesses.
                </h1>
                <p className="max-w-2xl text-base leading-7 text-cedar-charcoal/72 sm:text-[1.05rem]">
                  Deodar-Brew shows how cafes, restaurants, bakeries, cloud
                  kitchens, tea stalls, juice shops, and fast-food counters can
                  offer a digital menu, cart, and WhatsApp ordering flow without
                  accounts or complicated checkout.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <PremiumCta href="/menu" label="Browse menu" />
                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="button-pop inline-flex items-center justify-center gap-2 rounded-2xl border border-cedar-green/30 bg-white/80 px-5 py-3 text-sm font-bold text-cedar-green shadow-[0_14px_32px_rgba(28,13,8,0.07)] backdrop-blur hover:border-cedar-green/50 hover:bg-white"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Try WhatsApp order
                  </a>
                )}
              </div>

              <div className="grid max-w-2xl grid-cols-2 gap-2 sm:grid-cols-4">
                {heroProofSteps.map((step) => (
                  <div
                    key={step.label}
                    className="rounded-2xl border border-white/70 bg-white/65 px-3 py-2.5 shadow-[0_10px_24px_rgba(28,13,8,0.06)] backdrop-blur"
                  >
                    <step.icon
                      className="h-4 w-4 text-cedar-green"
                      aria-hidden="true"
                    />
                    <p className="mt-1.5 text-[11px] font-extrabold leading-4 text-cedar-espresso">
                      {step.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="motion-fade-up motion-delay-1">
              <div className="float-soft relative rounded-[32px] border border-white/75 bg-white/60 p-2.5 shadow-[0_28px_74px_rgba(28,13,8,0.15)] backdrop-blur-2xl">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-cedar-caramel/20 blur-2xl" />
                <div className="relative rounded-[26px] border border-cedar-border/45 bg-cedar-surface p-3">
                  <div className="mb-3 flex items-center justify-between gap-3 border-b border-cedar-border/50 pb-3">
                    <div className="flex gap-1.5">
                      <span className="h-2 w-2 rounded-full bg-cedar-caramel/70" />
                      <span className="h-2 w-2 rounded-full bg-cedar-amber/70" />
                      <span className="h-2 w-2 rounded-full bg-cedar-green/70" />
                    </div>
                    <span className="rounded-full bg-cedar-green/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cedar-green">
                      Pickup ready
                    </span>
                  </div>

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cedar-caramel">
                        Customer view
                      </p>
                      <h2 className="mt-1 font-heading text-2xl font-semibold tracking-[-0.02em] text-cedar-espresso">
                        {cafeName} menu
                      </h2>
                    </div>
                    <div className="rounded-2xl bg-white px-3 py-2 text-right shadow-[0_12px_30px_rgba(33,18,13,0.08)]">
                      <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-cedar-charcoal/50">
                        Cart
                      </p>
                      <p className="text-base font-extrabold text-cedar-brown">
                        {currencySymbol}
                        {previewTotal}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2.5">
                    {previewItems.length > 0 ? (
                      previewItems.map((item) => (
                        <MenuPreviewCard
                          key={item.id}
                          item={item}
                          currencySymbol={currencySymbol}
                        />
                      ))
                    ) : (
                      <div className="rounded-3xl border border-dashed border-cedar-border/70 bg-white/70 p-6 text-sm text-cedar-charcoal/60">
                        Featured menu items appear here once the admin adds
                        them.
                      </div>
                    )}
                  </div>

                  <div className="mt-3 grid grid-cols-[1fr_auto] gap-3 rounded-[22px] bg-[linear-gradient(135deg,#25110c,#3a180f)] p-3 text-white shadow-[0_18px_40px_rgba(28,13,8,0.2)]">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white/10">
                        <MessageCircle className="h-4 w-4 text-cedar-amber" />
                      </span>
                      <div>
                        <p className="text-sm font-extrabold">
                          WhatsApp checkout
                        </p>
                        <p className="text-xs leading-4 text-cedar-beige/75">
                          Cart details become a readable order message.
                        </p>
                      </div>
                    </div>
                    <ArrowRight
                      className="mt-2 h-4 w-4 text-cedar-amber"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <AnimatedSection id="featured" className="section-py">
          <div className="mx-auto max-w-6xl container-px">
            <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
              <SectionHeading
                eyebrow="Featured menu"
                title="Featured items should look appetizing, even in demo mode."
                description="Menu records power both this homepage preview and the full ordering page."
              />
              <Link
                href="/menu"
                className="button-pop inline-flex w-fit items-center gap-2 rounded-2xl border border-cedar-border/60 bg-white/80 px-4 py-3 text-sm font-bold text-cedar-brown shadow-sm hover:border-cedar-caramel/50 hover:bg-white"
              >
                View full menu
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

            {featuredItems.length > 0 ? (
              <div
                className={`grid gap-5 ${getFeaturedMenuGridClass(
                  featuredItems.length
                )}`}
              >
                {featuredItems.map((item) => (
                  <FeaturedMenuCard
                    key={item.id}
                    item={item}
                    currencySymbol={currencySymbol}
                  />
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-cedar-border/70 bg-white/80 p-8 text-center text-sm text-cedar-charcoal/60 shadow-[0_18px_45px_rgba(33,18,13,0.07)]">
                Featured menu items will appear here when they are marked in the
                admin dashboard.
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection className="section-py bg-white/40">
          <div className="mx-auto max-w-6xl container-px">
            <SectionHeading
              eyebrow="Ordering flow"
              title="The demo shows the whole customer journey, not only a static menu."
              description="A real cafe owner can see how the public menu, cart, WhatsApp handoff, and admin-managed content work together."
              className="mb-10"
            />
            <OrderFlow />

            <div className="mt-8 rounded-[30px] border border-white/70 bg-cedar-sage/40 p-5 shadow-[0_20px_55px_rgba(33,18,13,0.08)] backdrop-blur md:p-7">
              <div className="mb-5 flex max-w-2xl items-start gap-3">
                <Sparkles className="mt-1 h-5 w-5 shrink-0 text-cedar-green" />
                <div>
                  <h3 className="text-xl font-extrabold text-cedar-espresso">
                    Suitable for several food-counter formats.
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-cedar-charcoal/70">
                    The same structure can support focused menus, fast ordering,
                    counter specials, and basic cafe information.
                  </p>
                </div>
              </div>
              <BusinessTypes />
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection id="offers" className="section-py">
          <div className="mx-auto max-w-6xl container-px">
            <SectionHeading
              align="center"
              eyebrow="Today's offers"
              title="Promotions that feel like part of the cafe experience."
              description="Offers can highlight combos, seasonal items, quick pickup prompts, and counter specials."
              className="mb-10"
            />

            {offers.length > 0 ? (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {offers.map((offer, index) => (
                  <article
                    key={offer.id}
                    className={`group relative overflow-hidden rounded-[28px] p-5 shadow-[0_22px_58px_rgba(33,18,13,0.1)] hover:-translate-y-1 ${
                      index === 0
                        ? "dark-panel text-white"
                        : "border border-white/75 bg-cedar-surface text-cedar-espresso"
                    }`}
                  >
                    <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cedar-amber/20 blur-2xl" />
                    <div className="relative flex items-start justify-between gap-4">
                      <span
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl ${
                          index === 0
                            ? "bg-white/10 text-cedar-amber"
                            : "bg-cedar-amber/10 text-cedar-caramel"
                        }`}
                      >
                        <BadgePercent className="h-5 w-5" />
                      </span>
                      {offer.badge && (
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-extrabold uppercase tracking-wide ${
                            index === 0
                              ? "bg-white/10 text-white"
                              : "bg-white text-cedar-brown"
                          }`}
                        >
                          {offer.badge}
                        </span>
                      )}
                    </div>
                    <h3 className="relative mt-6 text-xl font-extrabold leading-tight">
                      {offer.title}
                    </h3>
                    <p
                      className={`relative mt-3 text-sm leading-6 ${
                        index === 0
                          ? "text-cedar-beige/80"
                          : "text-cedar-charcoal/70"
                      }`}
                    >
                      {offer.description}
                    </p>
                  </article>
                ))}
              </div>
            ) : (
              <div className="rounded-[28px] border border-dashed border-cedar-border/70 bg-white/80 p-8 text-center text-sm text-cedar-charcoal/60 shadow-[0_18px_45px_rgba(33,18,13,0.07)]">
                Offers can be added from the admin dashboard when the business
                wants to promote something.
              </div>
            )}
          </div>
        </AnimatedSection>

        {settings?.aboutText && (
          <AnimatedSection id="about" className="section-py bg-white/40">
            <div className="mx-auto max-w-6xl container-px">
              <div className="grid gap-8 lg:grid-cols-[0.88fr_1.12fr] lg:items-start">
                <div className="rounded-[30px] dark-panel p-6 text-white shadow-[0_26px_75px_rgba(33,18,13,0.2)] md:p-8">
                  <div className="inline-flex rounded-full bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-cedar-amber">
                    Admin-managed demo
                  </div>
                  <h2 className="mt-5 text-3xl font-extrabold leading-tight tracking-[-0.02em] sm:text-4xl">
                    Built to demonstrate a useful local food-business website.
                  </h2>
                  <p className="mt-5 whitespace-pre-line text-sm leading-7 text-cedar-beige/80 sm:text-base">
                    {settings.aboutText}
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {adminFeatures.map((feature) => (
                    <FeatureCard key={feature.title} {...feature} />
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

        {gallery.length > 0 && (
          <AnimatedSection id="gallery" className="section-py">
            <div className="mx-auto max-w-6xl container-px">
              <SectionHeading
                align="center"
                eyebrow="Gallery"
                title="A visual layer for food, counter, and cafe atmosphere."
                description="Food photos give the storefront a more appetizing first impression, while the admin area can still replace them for a real business."
                className="mb-10"
              />

              <div className={`grid gap-4 ${getGalleryGridClass(gallery.length)}`}>
                {gallery.map((img) => {
                  const imageUrl = resolveMenuImageUrl(
                    img.imageUrl,
                    img.caption ?? img.alt
                  );
                  const isSvgImage = isSvgImageUrl(imageUrl);

                  return (
                    <figure
                      key={img.id}
                      className="group overflow-hidden rounded-[24px] border border-white/75 bg-cedar-surface p-2 shadow-[0_20px_55px_rgba(33,18,13,0.09)] hover:-translate-y-1"
                    >
                      <div className="image-well relative aspect-[4/3] overflow-hidden rounded-[18px]">
                        <Image
                          src={imageUrl}
                          alt={img.alt}
                          fill
                          className={`transition-transform duration-500 group-hover:scale-[1.04] ${
                            isSvgImage ? "object-contain p-8" : "object-cover"
                          }`}
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          unoptimized={isSvgImage}
                        />
                      </div>
                      {img.caption && (
                        <figcaption className="px-2 py-3 text-xs font-bold text-cedar-charcoal/70">
                          {img.caption}
                        </figcaption>
                      )}
                    </figure>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>
        )}

        {settings && (
          <AnimatedSection id="visit" className="section-py bg-white/40">
            <div className="mx-auto max-w-6xl container-px">
              <SectionHeading
                align="center"
                eyebrow="Visit"
                title="The essentials customers check before ordering."
                description="Phone, hours, address, and optional map details come from cafe settings."
                className="mb-10"
              />

              <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
                <div className="rounded-[28px] soft-card p-6 hover-lift">
                  <MapPin className="h-6 w-6 text-cedar-caramel" />
                  <h3 className="mt-5 text-xl font-extrabold text-cedar-espresso">
                    Address
                  </h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-cedar-charcoal/70">
                    {settings.address}
                  </p>
                  {settings.mapsUrl ? (
                    <a
                      href={settings.mapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-2 text-sm font-extrabold text-cedar-brown hover:text-cedar-espresso"
                    >
                      Open in maps
                      <ArrowRight className="h-4 w-4" />
                    </a>
                  ) : (
                    <p className="mt-5 rounded-2xl bg-cedar-cream/70 px-4 py-3 text-xs font-semibold text-cedar-charcoal/60">
                      Map link appears here when configured.
                    </p>
                  )}
                </div>

                <div className="rounded-[28px] soft-card p-6 hover-lift">
                  <Clock className="h-6 w-6 text-cedar-caramel" />
                  <h3 className="mt-5 text-xl font-extrabold text-cedar-espresso">
                    Hours
                  </h3>
                  <p className="mt-3 whitespace-pre-line text-sm leading-6 text-cedar-charcoal/70">
                    {settings.openingHours}
                  </p>
                </div>

                <div className="rounded-[28px] soft-card p-6 hover-lift">
                  <Phone className="h-6 w-6 text-cedar-caramel" />
                  <h3 className="mt-5 text-xl font-extrabold text-cedar-espresso">
                    Contact
                  </h3>
                  <a
                    href={`tel:${settings.phone}`}
                    className="mt-3 block text-sm font-extrabold text-cedar-brown hover:text-cedar-espresso"
                  >
                    {settings.phone}
                  </a>
                  <p className="mt-3 text-sm leading-6 text-cedar-charcoal/70">
                    Customers can call directly or use the WhatsApp cart flow
                    when ordering from the menu.
                  </p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        )}

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
