import Pagination from '#client/Pagination';
import ProductCard from '#client/ProductCard';
import { loadProducts } from '@common/actions/server/Product';

import { getSort } from '@common/utils/frontend/sorting';
import { productSortableFields } from '@common/data/sortables/product';
import loadWebsiteData from '~common/websiteCache';
import SearchInput from '#client/SearchInput';
import { productSortableLabels, productSortableLabelsWithScore } from '@common/data/sortables/product';
import { OpenFilterButton } from '#client/SideBarFilter/OpenFilterButton';
import { SortButton } from '#client/SideBarFilter/SortButton';
import { getTranslations } from 'next-intl/server';
import CategoriesSelected from './CategoriesSelected';

export default async function Products({
	searchParams: asyncSearchParams,
	params,
}: {
	params: Promise<{ locale: LanguagesI }>;
	searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
	const [searchParams, { locale }] = await Promise.all([asyncSearchParams, params, loadWebsiteData()]);

	const stringLimit = Array.isArray(searchParams?.limit) ? searchParams?.limit[0] : searchParams?.limit;
	const limit = stringLimit ? Number.parseInt(stringLimit) : 12;
	const currentPage = Array.isArray(searchParams?.page)
		? Number.parseInt(searchParams?.page[0])
		: Number.parseInt(searchParams?.page || '1');
	const search = Array.isArray(searchParams?.search) ? searchParams?.search[0] : searchParams?.search;
	const categories = searchParams?.categories
		? Array.isArray(searchParams?.categories)
			? searchParams?.categories
			: searchParams?.categories.split(',')
		: undefined;
	const maxPrice = searchParams
		? searchParams['max-price'] && !Array.isArray(searchParams['max-price'])
			? Number.parseInt(searchParams['max-price'])
			: undefined
		: undefined;
	const minPrice = searchParams
		? searchParams['min-price'] && !Array.isArray(searchParams['min-price'])
			? Number.parseInt(searchParams['min-price'])
			: undefined
		: undefined;
	const minRating = searchParams
		? searchParams['min-rating'] && !Array.isArray(searchParams['min-rating'])
			? Number.parseInt(searchParams['min-rating'])
			: undefined
		: undefined;
	const label: string | undefined = searchParams?.label
		? Array.isArray(searchParams?.label)
			? searchParams?.label[0]
			: searchParams?.label
		: undefined;
	const response = await loadProducts(
		{
			search,
			page: currentPage,
			categories,
			limit,
			maxPrice,
			minPrice,
			minRating,
			label,
			...getSort(
				productSortableFields as unknown as ProductSortableFields[],
				Array.isArray(searchParams?.sort) ? searchParams?.sort[0] : searchParams?.sort || 'createdAt',
				Array.isArray(searchParams?.sortDir) ? searchParams?.sortDir[0] : searchParams?.sortDir || 'desc'
			),
		},
		locale
	);

	if (!response.success) throw new Error(response.message);
	const { list: products, total = 0 } = response.data;
	const totalPages = Math.ceil(total / limit);
	const t = await getTranslations({ locale, namespace: 'ProductsPage' });
	return (
		<div className="relative pb-28">
			<div className="container mx-auto flex flex-wrap justify-between gap-4">
				<SearchInput />
				<OpenFilterButton />
				<SortButton sortables={search ? productSortableLabelsWithScore : productSortableLabels} />
			</div>
			<div className="my-8 flex w-full flex-col gap-4">
				<p>
					{t('totalResults', {
						total,
						currentTotal: products.length,
						searchTerm: search ? `:'${search}'` : ':',
					})}
				</p>
				{categories && categories.length && (
					<div className="flex w-full flex-wrap items-center gap-2">
						<p>{t('appliedFilter')}:</p>
						<CategoriesSelected locale={locale} selectedCategories={categories} />
					</div>
				)}
			</div>
			<div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2 2xl:grid-cols-3">
				{products.map((item) => (
					<div key={item.slug} className="flex justify-center">
						<ProductCard locale={locale} product={item} />
					</div>
				))}
			</div>
			{/* Pagination */}

			<Pagination currentPage={currentPage} pages={totalPages} />
			{/* <Image
				className="absolute bottom-0 left-0 -z-20 -translate-x-1/2 transform"
				src={'/images/star.png'}
				alt="star decoration image"
				width={189}
				height={189}
			/>
			<Image
				className="absolute right-0 top-[5%] -z-20 translate-x-1/2 transform"
				src={'/images/star.png'}
				alt="star decoration image"
				width={189}
				height={189}
			/> */}
		</div>
	);
}
