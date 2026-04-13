import Pagination from '#client/Pagination';
import SearchInput from '#client/SearchInput';

// import { getSort } from '@client/utils/sorting';
// import { productSortableLabels, productSortableLabelsWithScore } from '@common/data/sortables/product';
import { getTranslations } from 'next-intl/server';
import { loadBlogs } from '@common/actions/server/Blog';
import BlogItem from '#client/BlogItem';
import { SortButton } from '#client/SideBarFilter/SortButton';
import { blogSortableFields, blogSortableLabels, blogSortableLabelsWithScore } from '@common/data/sortables/blogs';
import { getSort } from '@common/utils/frontend/sorting';

export default async function Blogs({
	searchParams: asyncSearchParams,
	params,
}: {
	params: Promise<{ locale: LanguagesI }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const [searchParams, { locale }] = await Promise.all([asyncSearchParams, params]);
	const t = await getTranslations({ locale, namespace: 'BlogPage' });

	const stringLimit = Array.isArray(searchParams?.limit) ? searchParams?.limit[0] : searchParams?.limit;
	const limit = stringLimit ? Number.parseInt(stringLimit) : 16;
	const currentPage = Array.isArray(searchParams?.page)
		? Number.parseInt(searchParams?.page[0])
		: Number.parseInt(searchParams?.page || '1');
	const search = Array.isArray(searchParams?.search) ? searchParams?.search[0] : searchParams?.search;
	const response = await loadBlogs(
		{
			search,
			page: currentPage,
			limit,
			...getSort(
				blogSortableFields as unknown as BlogSortableFields[],
				Array.isArray(searchParams?.sort) ? searchParams?.sort[0] : searchParams?.sort || 'createdAt',
				Array.isArray(searchParams?.sortDir) ? searchParams?.sortDir[0] : searchParams?.sortDir || 'desc'
			),
		},
		locale
	);

	if (!response.success) throw new Error(response.message);
	const { list: blogs, total = 0 } = response.data;
	const totalPages = Math.ceil(total / limit);

	return (
		<div className="flex w-full flex-col gap-8 py-8">
			<h2 className="text-center text-5xl font-bold">{t('title')}</h2>
			<div className="container mx-auto flex items-center gap-6">
				<div className="flex w-full flex-1 flex-col gap-4">
					<div className="container flex items-center justify-center gap-4">
						<SearchInput />
						<div className="max-lg:hidden">
							<SortButton sortables={search ? blogSortableLabelsWithScore : blogSortableLabels} />
						</div>
					</div>
					<div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-3 2xl:grid-cols-4">
						{blogs.map((item) => (
							<div key={item.slug} className="flex justify-center">
								<BlogItem item={item} />
							</div>
						))}
					</div>

					<Pagination currentPage={currentPage} pages={totalPages} />
				</div>
			</div>
		</div>
	);
}
