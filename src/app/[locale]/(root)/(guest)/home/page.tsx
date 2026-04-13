import DiscoverSection from '#client/Landing/DiscoverSection';
import HeroSection from '#client/Landing/HeroSection';
import React from 'react';
import FAQ from '#client/Landing/Faq';
import TestimonialsSection from '#client/Landing/TestimonialsSection';
import ContactSection from '#client/Landing/ContactSection';
import loadWebsiteData from '~common/websiteCache';
import CategoriesSection from '#client/Landing/CategoriesSection';
export const revalidate = 3600;
export default async function RootPage({ params }: { params: Promise<{ locale: LanguagesI }> }) {
	const [{ locale }, website] = await Promise.all([params, loadWebsiteData()]);
	const banners = website.banners as PublicBannerElementI[]; //
	return (
		<main className="flex min-h-screen w-full flex-col">
			{/* Hero section */}
			<HeroSection banners={banners} websiteInformation={website.websiteInformation} locale={locale} />
			{/* Categories section */}
			{banners.length > 0 ? <CategoriesSection locale={locale} /> : null}
			{/* Benefits section */}
			{/*
				<BenefitsSection locale={locale} services={website.services}   testimonials={website.testimonials}/>
				*/}
			{/* discover section */}
			<DiscoverSection locale={locale} />
			{/* blogs section */}
			{/*
			<BlogsSection locale={locale} />
			*/}
			{/* testimonials section */}
			<TestimonialsSection locale={locale} testimonials={website.testimonials as PublicRatedServiceElementI[]} />
			{/* FAQ */}
			<FAQ locale={locale} faqs={website.faqs} />
			{/* Contact */}
			<ContactSection locale={locale} />
		</main>
	);
}
