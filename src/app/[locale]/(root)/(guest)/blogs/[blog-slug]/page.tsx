import React from 'react';
import { notFound } from 'next/navigation';
import { loadBlogBySlug, loadPageBlogs } from '@common/actions/server/Blog';
import { localesMap } from '@common/i18n/languages';
import Image from 'next/image';
import { getTranslations } from 'next-intl/server';
import { blogsLabelsMap } from '@common/data/enums/generalEnums';
import HorizontalSlider from '#client/Sliders/Horizontal';
import BlogItem from '#client/BlogItem';

const formatDate = (dateString: number | string, locale: LanguagesI = 'fr'): string => {
	const date = dateString ? new Date(dateString) : new Date();
	const formatted = new Intl.DateTimeFormat(localesMap[locale], {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		weekday: 'short',
	}).format(date);

	// Capitalize each word
	return formatted.replace(/\b\w/g, (char) => char.toUpperCase());
};
export default async function BlogDetails({
	params,
}: {
	params: Promise<{ 'blog-slug': string; locale: LanguagesI }>;
}) {
	const { 'blog-slug': slug, locale } = await params;
	const [t, list, response] = await Promise.all([
		getTranslations({ locale, namespace: 'BlogPage' }),
		loadPageBlogs(locale),
		loadBlogBySlug(slug, locale),
	]);

	if (!response.success) {
		return notFound();
	}
	if (!list.success) throw new Error(list.message);

	const { list: blogsSlider } = list.data;

	const blog = response.data;

	return (
		<div className="container mx-auto my-16 flex flex-col gap-8">
			<h2 className="text-center text-5xl font-bold">{blog.name[locale]}</h2>
			<div className="flex items-center justify-center gap-4 font-serif">
				<div className="max-w-fit rounded-lg bg-primaryG/10 px-3 py-1 text-primaryG">
					{blog.label && blogsLabelsMap[blog.label]
						? blogsLabelsMap[blog.label][locale]
						: blogsLabelsMap['Tips'][locale]}
				</div>
				<div className="flex items-center gap-2">
					<p className="text-xs text-grayN">{formatDate(blog.createdAt, locale)}</p>
					<div className="h-1 w-1 rounded-full bg-grayN" />
					<p className="text-xs text-grayN">
						{t('read-time', {
							minutes: Math.ceil(blog.content[locale].length / 200), // Assuming an average reading speed of 200 words per minute
						})}
					</p>
				</div>
			</div>

			<Image
				className="max-h-[500px] w-full rounded-3xl object-cover object-center"
				src={blog.cover ? blog.cover.src : '/images/placeholder.png'}
				alt={blog.cover?.alt || 'blogs image'}
				width={blog.cover?.width}
				height={blog.cover?.height}
			/>
			<div className="w-full" dangerouslySetInnerHTML={{ __html: blog.content[locale] }} />

			<h3 className="mt-16 text-center text-4xl font-bold">{t('more')}</h3>
			<HorizontalSlider RenderComponent={BlogItem} slides={blogsSlider} />
		</div>
	);
}
