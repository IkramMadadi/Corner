'use client';
import { defaultLocale, localesMap } from '@common/i18n/languages';
import { blogsLabelsMap } from '@common/data/enums/generalEnums';
import { useLocale } from 'next-intl';
import Image from 'next/image';
import { Link } from '@client/i18n/routing';
import CategoryTag from './CategoryTag';

const formatDate = (dateString: number | string, locale: LanguagesI = 'fr'): string => {
	const date = dateString ? new Date(dateString) : new Date();
	return new Intl.DateTimeFormat(localesMap[locale], {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'short',
	}).format(date);
};

export default function BlogItem({ item }: { item: BlogTableDataI }) {
	const locale = useLocale() as LanguagesI;
	return (
		<div className="w-full rounded-2xl px-4 py-6">
			<Image
				className="mb-4 aspect-square w-full rounded-2xl object-cover"
				src={item.thumbnail?.src || 'https://placehold.co/350.webp'}
				alt={item.thumbnail?.alt || 'blog placeholder'}
				width={350}
				height={350}
			/>
			<div className="mb-4 flex items-baseline justify-between" data-label={item.label}>
				<CategoryTag
					categoryTag={item.label || 'default'}
					label={
						item.label && blogsLabelsMap[item.label]
							? blogsLabelsMap[item.label][locale]
							: blogsLabelsMap['Tips'][locale]
					}
					href={`/blogs/?label=${item.label}`}
				/>
				<p className="text-xs text-grayN">{formatDate(item.createdAt, locale)}</p>
			</div>
			<Link locale={locale} href={'/blogs/' + item.slug} className="text-xl font-semibold">
				{item.name[locale]}
			</Link>
			<p className="mt-4 text-sm">{item.summary[locale] || item.summary[defaultLocale]}</p>
		</div>
	);
}
