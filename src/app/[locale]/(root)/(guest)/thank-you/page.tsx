import Link from "next/link";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const locales: LanguagesI[] = ["ar", "en", "fr"];
  return locales.map((locale) => ({ locale }));
}

export default async function ThankYouPage({
  params,
}: {
  params: Promise<{ locale: LanguagesI }>;
}) {
	
  const [{ locale }] = await Promise.all([params]);

  return (
    <main className="container mx-auto px-6 py-14 lg:py-20" dir={locale === "ar" ? "rtl" : "ltr"}>
      <section className="mx-auto max-w-3xl rounded-3xl bg-white p-8 text-center shadow-xl ring-1 ring-black/5">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-green-600">
          <span className="icon-[iconoir--check-circle] h-8 w-8" />
        </div>

        <h1 className="text-2xl font-bold sm:text-3xl lg:text-4xl">
          {locale === "ar"
            ? "تم استلام طلبك بنجاح"
            : locale === "fr"
            ? "Votre commande a été reçue avec succès"
            : "Your order has been received successfully"}
        </h1>

        <p className="mx-auto mt-3 max-w-2xl text-neutral-600">
          {locale === "ar"
            ? "شكراً لثقتك بنا! سيتصل بك فريقنا لتأكيد الطلب وسيتم توصيله إليك في أقرب وقت ممكن"
            : locale === "fr"
            ? "Merci pour votre confiance ! Notre équipe vous contactera pour confirmer la commande et la livrer dès que possible."
            : "Thank you for your trust! Our team will contact you to confirm the order and deliver it as soon as possible."}
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            className="rounded-lg bg-primary px-6 py-3 font-medium text-white shadow transition-colors duration-200 hover:bg-primary/90"
            href={`/${locale}/products`}
            prefetch={false}
          >
            {locale === "ar" ? "تصفح المنتجات" : locale === "fr" ? "Parcourir les produits" : "Browse products"}
          </Link>
        </div>
      </section>
    </main>
  );
}
