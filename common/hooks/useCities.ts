'use client';
import { useQuery } from '@tanstack/react-query';

import AlgeriaDataManager from '@common/utils/frontend/AlgeriaDataManager';
import { useMemo } from 'react';

function useCities(provinceId: number | string, locale: LanguagesI) {
	const query = useQuery({
		queryFn: async () =>
			AlgeriaDataManager.getInstance(locale).getCitiesByProvinceId(
				typeof provinceId === 'number' ? provinceId : Number.parseInt(provinceId)
			),
		queryKey: ['cities', provinceId],
		initialData: [],
	});
	const cities = useMemo(
		() => query.data.sort((a, b) => a.name[locale].localeCompare(b.name[locale])),
		[query.data, locale]
	);
	return { ...query, cities };
}

export default useCities;
