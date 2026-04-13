'use client';
import { filterBarEventEmitter } from '@common/events/filterBar';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDebounce } from 'use-debounce';

interface CategoryCheckboxListProps {
	categories: SimpleCategoryI[];
}

const CategoryCheckboxList: React.FC<CategoryCheckboxListProps> = ({ categories }) => {
	const t = useTranslations('Filters');
	const locale = useLocale() as LanguagesI;
	const searchParams = useSearchParams();
	const [selectedCategories, setSelectedCategories] = useState<string[]>(
		searchParams.get('categories')?.split(',') || []
	);

	const handleCheckboxChange = (categoryId: string) => {
		setSelectedCategories((prevSelected) =>
			prevSelected.includes(categoryId)
				? prevSelected.filter((id) => id !== categoryId)
				: [...prevSelected, categoryId]
		);
	};
	const [debouncedSelectedCategories] = useDebounce(selectedCategories, 750);
	const router = useRouter();

	useEffect(() => {
		const currentParams = new URLSearchParams(searchParams.toString());
		if (debouncedSelectedCategories.length > 0) {
			currentParams.set('categories', debouncedSelectedCategories.join(','));
		} else {
			currentParams.delete('categories');
		}
		// Push the new URL with updated query parameters
		router.push(`?${currentParams.toString()}`, {
			scroll: false,
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [debouncedSelectedCategories]);
	useEffect(() => {
		const emptyFilter = () => {
			setSelectedCategories([]);
		};
		const removeCategory = (categoryId: string) => {
			setSelectedCategories((prev) => prev.filter((elm) => elm !== categoryId));
		};
		filterBarEventEmitter.on('emptyFilterBar', emptyFilter);
		filterBarEventEmitter.on('removeCategory', removeCategory);
		return () => {
			filterBarEventEmitter.off('emptyFilterBar', emptyFilter);
			filterBarEventEmitter.off('removeCategory', removeCategory);
		};
	}, []);

	return (
		<div className="flex w-full flex-col gap-4 pl-4">
			<h3 className="mb-2 font-serif">{t('categories')}</h3>
			<div className="flex flex-col gap-2">
				{categories.length > 0 ? (
					categories.map((category) => (
						<label key={category._id} className="flex items-center gap-3">
							<input
								type="checkbox"
								value={category._id}
								checked={selectedCategories.includes(category._id)}
								onChange={() => handleCheckboxChange(category._id)}
								className="h-6 w-6 rounded-2xl border-gray-300 text-primary accent-primary focus:ring-primary"
							/>
							<div className="flex w-full items-center justify-between">
								<span className="text-xs">{category.name[locale]}</span>
								<span className="text-xs">{category.productsCount || 0}</span>
							</div>
						</label>
					))
				) : (
					<p className="text-center text-sm text-gray-500">{t('noCategories')}</p>
				)}
			</div>
		</div>
	);
};

export default CategoryCheckboxList;
