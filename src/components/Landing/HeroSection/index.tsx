import BannerSection from './BannerSection';
import BaseHero from './BaseHero';
// import { getTranslations } from 'next-intl/server';

export default function HeroSection({
	banners,
	locale,
	websiteInformation,
}: {
	banners: PublicBannerElementI[];
	locale: LanguagesI;
	websiteInformation: WebsiteInformationI;
}) {
	return (
		<section className="relative w-full overflow-hidden">
			<div
				className="absolute inset-0 bg-repeat-x"
				style={{ backgroundImage: `url(/images/bg-pattern.svg)`, backgroundSize: 'auto 100%' }}
			/>
			{banners.length > 0 ? (
				<BannerSection banners={banners} />
			) : (
				<BaseHero locale={locale} websiteInformation={websiteInformation} />
			)}
		</section>
	);
}
