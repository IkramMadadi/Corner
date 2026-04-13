'use client';
import ButtonPrimary from '#client/Buttons/ButtonPrimary';
import UserDropdown from '#client/UserDropdown';
import { useSession } from 'next-auth/react';
import { useTranslations } from 'next-intl';

export default function NavbarAuthElement({ locale }: { locale: LanguagesI }) {
	const t = useTranslations('Auth' );
	const session = useSession();

	if (session === null || !session.data)
		return (
			<ButtonPrimary
				href="/auth"
				className="min-w-fit bg-primary px-2 hover:bg-primary/80 hover:text-white md:px-4 lg:px-8"
			>
				{t('login')}
			</ButtonPrimary>
		);
	return <UserDropdown {...session.data.user as NecessaryCustomerI} locale={locale} />;
}
