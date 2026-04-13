'use client';

import { Link } from '@client/i18n/routing';
import { useLocale } from 'next-intl';
import React, { useState } from 'react';

const tabs = ['Home', 'Banner', 'New Arrival'];

const SectionNavigation = () => {
	const locale = useLocale();
	const [activeTab, setActiveTab] = useState('New Arrival');
	return (
		<div className="my-10 flex items-center justify-between">
			<Link locale={locale} href="/">
				<span className="icon-[iconoir--arrow-left-circle] text-4xl text-neutral-300" />
			</Link>

			<div className="flex items-center gap-4">
				{tabs.map((tab) => (
					<button
						key={tab}
						type="button"
						onClick={() => setActiveTab(tab)}
						className={`${activeTab === tab ? 'text-primary' : 'text-neutral-500'}`}
					>
						{tab}
					</button>
				))}
			</div>
		</div>
	);
};

export default SectionNavigation;
