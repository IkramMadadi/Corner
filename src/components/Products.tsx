'use client';
import ProductCard from '#client/ProductCard';
import SearchInput from '#client/SearchInput';
import Pagination from '#client/Pagination';
import { useLocale } from 'next-intl';

export default function Products({
	products,
	length,
	searchParams,
}: {
	products: ProductTableDataI[];
	length: number;
	searchParams?: Record<string, string | string[] | undefined>;
}) {
	const locale = useLocale() as LanguagesI;
	const totalPages = Math.ceil(length / parseInt((searchParams?.limit as string) || '10'));

	return (
		<div>
			<div className="flex-1">
				<div className="sticky top-0 z-10 flex items-center gap-5 bg-white py-4">
					<SearchInput />
					<button className="flex items-center gap-2 rounded-md bg-[#F4F4F5]/20 px-4 py-2">
						<span className="icon-[iconoir--filter-alt]" />
					</button>
				</div>

				<div className="grid grid-cols-1 gap-4 p-4 lg:grid-cols-2 xl:grid-cols-3">
					{products.map((item) => (
						<ProductCard product={item} key={item.slug} locale={locale} />
					))}
				</div>

				<Pagination currentPage={parseInt(searchParams?.page as string) || 1} pages={totalPages} />
			</div>
		</div>
	);
}
