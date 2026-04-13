import React from 'react';

interface AccordionProps {
	question: string;
	answer: string;
}

const Accordion: React.FC<AccordionProps> = ({ question, answer }) => {
	return (
		<div className="mb-3 bg-white font-sans">
			<details className="group rounded-lg shadow-md">
				<summary className="flex w-full cursor-pointer items-start justify-between gap-10 rounded-lg px-4 py-6 md:px-6 md:py-6">
					<p className="text-sm font-medium text-gray-800 md:text-base lg:text-base">{question}</p>
					<div className="flex h-6 w-6 translate-y-1 items-center justify-center">
						<span className="icon-[mage--plus] block h-5 w-5 text-gray-600 group-open:hidden" />
						<span className="icon-[mage--minus] hidden h-5 w-5 text-gray-600 group-open:block" />
					</div>
				</summary>
				<div className="px-4 pb-4 text-sm text-neutral-500 md:px-6 md:text-base lg:text-base">{answer}</div>
			</details>
		</div>
	);
};

export default Accordion;
