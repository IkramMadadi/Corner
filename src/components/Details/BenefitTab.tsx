import BenefitItem from '#client/BenefitItem';

export default function BenefitTab({ benefits, locale }: { benefits: ServiceElementI[]; locale: LanguagesI }) {
	if (benefits && benefits.length > 0)
		return (
			<div id="product-benefits" className="grid grid-cols-2 gap-8">
				{benefits.map((benefit, i) => (
					<BenefitItem benefit={benefit} key={i} locale={locale} />
				))}
			</div>
		);
	return null;
}
