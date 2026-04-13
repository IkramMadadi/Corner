import type { ReactNode } from 'react';

export default function RadioFilter({
	children,
	value,
	name,
	onChange,
	radioClassName = 'w-4 h-4',
	checked,
}: {
	children: ReactNode;
	name: string;
	value: string;
	onChange: (key: string, value: string) => void;
	radioClassName?: string;
	checked?: boolean;
}) {
	return (
		<div className="flex w-full accent-primary">
			<label className="flex items-center gap-2">
				<input
					type="radio"
					name={name}
					value={value}
					onChange={() => onChange(name, value)}
					className={radioClassName}
					checked={checked}
				/>
				{children}
			</label>
		</div>
	);
}
