import { useLocale } from 'next-intl';
import AlertElement from './AlertElement';
import ButtonElement from './ButtonElement';
import { cn } from '@common/utils/frontend/utils';

export default function Banner({ item: banner }: { item: PublicBannerElementI; index: number }) {
	const locale = useLocale() as LanguagesI;
	return (
		<div
			className="flex h-full w-full justify-center"
			style={{
				background: banner.image
					? `center / cover no-repeat url(${banner.image}),  ${banner.color === 'dark' ? `rgba(0, 0, 0, ${banner.overlay})` : `rgba(255, 255, 255, ${banner.overlay})`}`
					: `url(/images/hero-banner.png), rgba(255, 255, 255,0.1)`,
				backgroundBlendMode: 'overlay',
			}}
		>
			<div className="container mx-auto flex justify-center px-4 py-12 xl:justify-start">
				<div
					className={cn(
						'flex w-full max-w-2xl flex-col justify-center gap-6 text-center xl:text-start',
						banner.color === 'dark' ? 'text-white' : 'text-gray-900'
					)}
				>
					<div className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-start">
						<AlertElement alert={banner.alert || null} locale={locale} />
						{/* Title */}
						<h1
							className={cn(
								'text-shadow select-none text-3xl font-bold lg:text-5xl lg:leading-snug',
								banner.color === 'dark' ? 'shadow-white/10' : 'shadow-black/10'
							)}
						>
							{banner.title[locale]}
						</h1>
					</div>
					{/* CTA Buttons */}
					<div className="flex flex-wrap items-center justify-center gap-5 lg:justify-start">
						{banner.buttons.map((button, index) => (
							<ButtonElement key={index} button={button} locale={locale} />
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
