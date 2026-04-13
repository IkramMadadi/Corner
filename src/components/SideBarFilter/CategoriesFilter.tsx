import React from 'react';
import CategoryCheckboxList from './CategoryCheckboxList';
import { loadCategoriesByIds } from '@common/actions/server/Category';

export default async function CategoriesFilter({ locale }: { locale: LanguagesI }) {
	const categoriesResponse = await loadCategoriesByIds(locale);

	if (!categoriesResponse.success) {
		throw new Error(categoriesResponse.message);
	}
	// await 4 seconds
	// await new Promise((resolve) => setTimeout(resolve, 4000));

	const categories = categoriesResponse.data;
	return <CategoryCheckboxList categories={categories} />;
}
