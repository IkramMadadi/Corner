'use client';
import { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import ButtonCircle from '#client/Buttons/ButtonCircle';

function generatePagination(currentPage: number, totalPages: number): ('...' | number)[] {
	if (totalPages <= 1) return [1];
	if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);

	if (currentPage <= 4) return [1, 2, 3, 4, 5, '...', totalPages];
	if (currentPage > totalPages - 5)
		return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];

	return [
		1,
		'...',
		currentPage - 2,
		currentPage - 1,
		currentPage,
		currentPage + 1,
		currentPage + 2,
		'...',
		totalPages,
	];
}

export default function Pagination({ currentPage, pages }: { currentPage: number; pages: number }) {
	const router = useRouter();

	// Fonction locale pour modifier le paramètre `page` dans l'URL
	const setCurrentPage = (page: number) => {
		const params = new URLSearchParams(window.location.search);
		params.set('page', page.toString());
		router.push(`?${params.toString()}`);
	};

	const pagesArray = useMemo(() => generatePagination(currentPage, pages), [currentPage, pages]);

	return (
		<div className="font-noto-serif mx-auto flex max-w-fit rounded-full border-2 border-secondaryP/50 px-4 py-2">
			<ButtonCircle disabled={currentPage <= 1} onClick={() => setCurrentPage(currentPage - 1)}>
				<span className="icon-[material-symbols--arrow-back-ios-new-rounded] rtl:rotate-180" />
			</ButtonCircle>
			{pagesArray.map((elm, i) => (
				<ButtonCircle
					key={elm + '' + i}
					className={elm === currentPage ? 'bg-secondaryP/50 text-white' : ''}
					onClick={() => {
						if (elm !== currentPage && elm !== '...') setCurrentPage(Number(elm));
					}}
				>
					{elm}
				</ButtonCircle>
			))}
			<ButtonCircle disabled={currentPage >= pages} onClick={() => setCurrentPage(currentPage + 1)}>
				<span className="icon-[material-symbols--arrow-back-ios-new-rounded] rotate-180 rtl:rotate-0" />
			</ButtonCircle>
		</div>
	);
}
