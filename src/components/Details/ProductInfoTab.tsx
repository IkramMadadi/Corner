'use client';
import { ReactNode, useEffect, useState } from 'react';

interface ProductInfoTabProps {
	tabs: string[];
	TabsContent: ReactNode[];
	className?: string;
}

export default function ProductInfoTab({ tabs, TabsContent, className }: ProductInfoTabProps) {
	const [activeTab, setActiveTab] = useState(tabs[0]);
	useEffect(() => {
		setActiveTab(tabs[0]);
	}, [tabs]);

	return (
		<div className={className}>
			<div className="mb-4 flex items-center gap-5">
				{tabs.map((tab) => (
					<button
						type="button"
						key={tab}
						onClick={() => setActiveTab(tab)}
						className={`py-2 ${activeTab === tab ? 'border-b-2 border-primary' : 'text-neutral-500'}`}
					>
						{tab}
					</button>
				))}
			</div>

			{tabs.map((tab, i) => (
				<div key={tab} className={`mb-6 ${activeTab === tab ? 'block' : 'hidden'}`}>
					{TabsContent[i]}
				</div>
			))}
		</div>
	);
}
