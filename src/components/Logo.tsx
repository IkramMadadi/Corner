import { cn } from '@common/utils/frontend/utils';
import Image from 'next/image';
import { Link } from '@client/i18n/routing';
import React from 'react';
import { useLocale } from 'next-intl';

export default function Logo({
	mode = 'wide',
	className = 'h-16 w-auto',
}: {
	mode?: 'wide' | 'tall';
	className?: string;
}) {
	const locale = useLocale();
	return (
		<Link locale={locale} className="cursor-pointer" href="/">
			{mode === 'wide' ? (
				<Image src="/images/decodar.png" alt="Logo" width={600} height={211} className={className} />
			) : (
				// block
				<Image
					src="/images/decodar.png"
					alt="Logo"
					width={600}
					height={211}
					className={cn('aspect-[72/59] h-full w-auto', className)}
				/>
			)}
		</Link>
	);
}
