import CategoryItem from '#client/CategoryItem';
import { loadCategoriesByIds } from '@common/actions/server/Category';
import React from 'react';

export default async function CategoriesSelected({
	selectedCategories,
	locale,
}: {
	selectedCategories?: string[];
	locale: LanguagesI;
}) {
	if (!selectedCategories) return null;
	const categoriesResponse = await loadCategoriesByIds(locale);
	if (!categoriesResponse.success) return null;
	const categories = categoriesResponse.data;
	return categories
		.filter((c) => selectedCategories.includes(c._id))
		.map((category, index) => (
			<div key={category._id} className="relative">
				<CategoryItem exit index={index} item={category} />
			</div>
		));
}
