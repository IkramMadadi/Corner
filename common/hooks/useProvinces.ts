'use client';
import AlgeriaDataManager from '@common/utils/frontend/AlgeriaDataManager';
import { useQuery } from '@tanstack/react-query';

const cashTime = 3600 * 1000 * 24;

function useProvinces(locale: LanguagesI) {
	const query = useQuery({
		queryFn: async () => AlgeriaDataManager.getInstance(locale).getProvinces(),
		queryKey: ['provinces'],
		initialData: [],
		gcTime: cashTime,
	});
	return { ...query, provinces: query.data };
}

export default useProvinces;
