import React, { Suspense } from 'react';

// import PriceRangeFilter from './PriceRangeFilter';
import RatingFiler from './RatingFiler';
import LabelsFilters from './LabelsFilters';
import CategoriesFilter from './CategoriesFilter';
import Loading from '#client/Loading';
import SideBarLayout from './SideBarLayout';

interface SidebarFiltersProps {
	// priceRange: NumbersRangeI;
	locale: LanguagesI;
}

export default function SidebarFilters({ locale }: SidebarFiltersProps) {
	return (
		<SideBarLayout>
			<div className="flex flex-col gap-8">
				<Suspense fallback={<Loading />}>
					<CategoriesFilter locale={locale} />
				</Suspense>
				<hr className="border" />
				{/* 
				Price Range Filter 
					<PriceRangeFilter priceRange={defaultPriceRange} /> 
				*/}
				{/* Customer Rating Filter */}
				<RatingFiler />
				<hr className="border" />
				{/* Availability Filter */}
				<LabelsFilters />
			</div>
		</SideBarLayout>
	);
}
