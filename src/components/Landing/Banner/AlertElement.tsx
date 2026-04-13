import ButtonElement from './ButtonElement';

export default function AlertElement({ alert, locale }: { alert: AlertElementI | null; locale: LanguagesI }) {
	if (!alert) return null;
	return (
		<div className="flex flex-wrap items-center justify-center gap-5 lg:justify-start">
			<p className="text-sm lg:text-base">{alert.content[locale]}</p>
			{alert.buttons.map((button, index) => (
				<ButtonElement key={index} button={button} locale={locale} />
			))}
		</div>
	);
}
