// AlgeriaDataManager.ts

import { provincesValidationSchema } from '^common/models/provinces';

interface City {
	id: number;
	commune_name_ascii: string;
	commune_name: string;
	wilaya_code: string;
}

interface Province {
	id: number;
	name: {
		en: string;
		ar: string;
	};
}

const storageKeys = {
	provinces: 'Algeria-Provinces',
	cities: 'Algeria-Cities',
};

export default class AlgeriaDataManager {
	private static instance: AlgeriaDataManager;
	private provincesMap: Map<number, ProvinceI> = new Map();
	private citiesMap: Map<number, Map<number, ProvinceCityI>> = new Map();
	private promises: {
		provinces: Promise<void>;
		cities: Promise<void>;
	};
	private constructor(locale: LanguagesI) {
		this.promises = { provinces: this.loadProvinces(locale), cities: this.loadCities(locale) };
	}

	public static getInstance(locale: LanguagesI): AlgeriaDataManager {
		if (!AlgeriaDataManager.instance) {
			AlgeriaDataManager.instance = new AlgeriaDataManager(locale);
		}
		return AlgeriaDataManager.instance;
	}

	public async loadProvinces(locale: LanguagesI): Promise<void> {
		const dataFromStorage = localStorage.getItem(storageKeys.provinces);
		if (dataFromStorage) {
			try {
				const parsed: ProvinceI[] = await provincesValidationSchema(locale).parseAsync(
					JSON.parse(dataFromStorage)
				);
				if (parsed.length < 58)
					throw new Error(
						{
							en: 'Not all the provinces are loaded',
							fr: 'Toutes les provinces ne sont pas chargées',
							ar: 'لم يتم تحميل جميع الولايات',
						}[locale]
					);
				this.provincesMap = new Map<number, ProvinceI>(parsed.map(p => [p.id, p]));
				return;
			} catch (err) {
				localStorage.removeItem(storageKeys.provinces);
				console.error(err);
			}
		}
		const response = await fetch('/Algeria/provinces.json');
		const provinces: Province[] = await response.json();
		for (const province of provinces) {
			this.provincesMap.set(province.id, {
				id: province.id,
				name: { ...province.name, fr: province.name.en },
			});
		}

		localStorage.setItem(storageKeys.provinces, JSON.stringify(Array.from(this.provincesMap.values())));
	}

	public async loadCities(locale: LanguagesI): Promise<void> {
		const dataFromStorage = localStorage.getItem(storageKeys.cities);
		if (dataFromStorage) {
			try {
				const provinces = JSON.parse(dataFromStorage) as Record<number, ProvinceCityI[]>;
				if (!provinces || !Object.keys(provinces).length)
					throw new Error(
						{
							en: 'Province cities not valid',
							fr: 'Villes de province non valides',
							ar: 'مدن المقاطعة غير صالحة',
						}[locale]
					);

				const parsed: ProvinceCityI[][] = await Promise.all(
					Object.values(provinces).map(province => provincesValidationSchema(locale).parseAsync(province))
				);
				this.citiesMap = new Map<number, Map<number, ProvinceCityI>>(
					parsed.map((p, i) => [i + 1, new Map<number, ProvinceCityI>(p.map(c => [c.id, c]))])
				);
				return;
			} catch (err) {
				localStorage.removeItem(storageKeys.cities);
				console.error(err);
			}
		}
		const response = await fetch('/Algeria/algeria_cities.json');
		const cities: City[] = await response.json();
		for (const city of cities) {
			const provinceId = Number.parseInt(city.wilaya_code, 10);
			if (!this.citiesMap.has(provinceId)) {
				this.citiesMap.set(provinceId, new Map());
			}
			this.citiesMap.get(provinceId)!.set(city.id, {
				id: city.id,
				name: {
					fr: city.commune_name_ascii,
					en: city.commune_name_ascii,
					ar: city.commune_name,
				},
			});
		}

		localStorage.setItem(
			storageKeys.cities,
			JSON.stringify(
				Array.from(this.citiesMap.entries()).reduce(
					(acc, [provinceId, citiesMap]) => {
						acc[provinceId] = Array.from(citiesMap.values());
						return acc;
					},
					{} as Record<number, ProvinceCityI[]>
				)
			)
		);
	}
	public async getProvinces(): Promise<ProvinceI[]> {
		await this.promises.provinces;
		return Array.from(this.provincesMap.values());
	}
	public getProvinceById(id: number): ProvinceI | undefined {
		return this.provincesMap.get(id);
	}

	public async getCitiesByProvinceId(provinceId: number): Promise<ProvinceCityI[]> {
		await this.promises.cities;
		const provinceCities = this.citiesMap.get(provinceId);
		return provinceCities ? Array.from(provinceCities.values()) : [];
	}

	public getCityById(provinceId: number, cityId: number): ProvinceCityI | undefined {
		const provinceCities = this.citiesMap.get(provinceId);
		return provinceCities ? provinceCities.get(cityId) : undefined;
	}
}
