import Accordion from '#client/Accordion';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export default async function FAQ({ locale, faqs }: { locale: LanguagesI; faqs: FAQI[] }) {
	const HomePage = await getTranslations({ locale, namespace: 'HomePage' });

	return (
		<section
			id="faqs"
			className="flex flex-col items-start justify-between gap-8 bg-repeat px-6 py-12 lg:flex-row lg:px-28 lg:py-20"
			style={{ backgroundImage: `url(/images/bg-pattern.svg)` }}
		>
			{/* Texte FAQ */}
			<div className="container mx-auto mb-8 w-full text-center lg:mx-0 lg:mb-0 lg:w-2/5 ltr:lg:text-left rtl:lg:text-right">
				<h2 className="mb-4 text-3xl font-bold lg:text-5xl">{HomePage('faqTitle')}</h2>
				<p className="px-8 text-gray-700 lg:px-0">{HomePage('faqDescription')}</p>
			</div>

			{/* FAQ Accordion */}
			<div className="w-full lg:w-3/5">
				{faqs.map((faq, i) => (
					<Accordion key={`faq-${i}`} question={faq.question[locale]} answer={faq.answer[locale]} />
				))}
			</div>
		</section>
	);
}
