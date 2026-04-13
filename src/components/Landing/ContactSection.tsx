import ContactForm from '#client/ContactForm';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import React from 'react';

export default async function ContactSection({ locale }: { locale: LanguagesI }) {
	const contact = await getTranslations({ locale, namespace: 'Contact' });
	return (
		<section
			id="contact"
			className="container relative mx-auto mb-32 mt-10 grid grid-cols-12 items-center gap-6 px-4"
		>
			<Image
				className="order-2 col-span-12 max-h-[50vh] w-full rounded-2xl object-cover object-bottom lg:order-1 lg:col-span-5 lg:row-span-2 lg:h-full lg:max-h-full"
				src={'/images/Contact.png'}
				width={846}
				height={1114}
				alt="Contact image"
			/>
			<div className="order-1 col-span-12 col-start-1 flex flex-col gap-4 text-center lg:order-2 lg:col-span-7 lg:col-start-6 lg:text-start 2xl:col-span-6 2xl:col-start-7">
				<h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">{contact('title')}</h2>
				<p className="text-sm md:text-base lg:text-lg">{contact('description')}</p>
			</div>
			<div className="order-3 col-span-12 col-start-1 flex flex-col gap-4 lg:col-span-7 lg:col-start-6 2xl:col-span-6 2xl:col-start-7">
				<ContactForm />
			</div>
			{/* <Image
				className="absolute -bottom-[20%] -left-[5%] z-[-20]"
				src={'/images/star2.png'}
				width={161}
				height={250}
				alt="Doriane micellaire"
			/> */}
		</section>
	);
}
