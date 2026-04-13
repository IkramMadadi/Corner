import { cn } from '@common/utils/frontend/utils';
import { blogsLabels } from '@common/data/enums/generalEnums';
import { Link } from '@client/i18n/routing';
import React from 'react';
import type { UrlObject } from 'url';
import { useLocale } from 'next-intl';
const statusMap: Record<BlogsLabelsT | 'default', string> = {
	/* blog */
	Articles: 'bg-primary text-black',
	Interviews: 'bg-primary text-black',
	News: 'bg-secondary text-black',
	Other: 'bg-secondaryB text-black',
	Reviews: 'bg-secondaryP text-black',
	Tips: 'bg-secondaryO text-white',
	Tutorials: 'bg-secondaryY text-white',

	/* default */
	default: 'bg-[#A0D6B4] text-black',
};
export default function CategoryTag({
	categoryTag,
	href,
	label,
}: {
	categoryTag: BlogsLabelsT | 'default';
	label: string;
	href: string | UrlObject;
}) {
	const locale = useLocale();
	return (
		<Link
			locale={locale}
			href={href}
			className={cn(
				'z-20 max-w-fit rounded-lg bg-opacity-15 px-3 py-1.5 font-sans text-xs',
				blogsLabels.includes(categoryTag as BlogsLabelsT)
					? statusMap[categoryTag as BlogsLabelsT]
					: statusMap.default
			)}
		>
			{label}
		</Link>
	);
}
