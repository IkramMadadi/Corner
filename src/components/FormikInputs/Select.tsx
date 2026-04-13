'use client';
import { DetailedHTMLProps, SelectHTMLAttributes } from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import { cn } from '@common/utils/frontend/utils';

export interface SelectInputProps<T extends string | number>
	extends DetailedHTMLProps<SelectHTMLAttributes<HTMLSelectElement>, HTMLSelectElement> {
	name: string;
	label?: string | [string, string];
	placeholder?: string;
	fcClassName?: string;
	options: { label: string; value: T }[];
}

export default function Select<T extends string | number>({
	label,
	name,
	options,
	fcClassName,
	...props
}: SelectInputProps<T>) {
	const [, { error, touched }] = useField(name);
	return (
		<label className={cn('w-full', fcClassName)}>
			{/* Label Section */}
			<div className="mb-2">
				{label ? (
					<>
						<span className="block font-medium">{Array.isArray(label) ? label[0] : label}</span>
						{Array.isArray(label) && <span className="block">{label[1]}</span>}
					</>
				) : null}
			</div>

			{/* Input Field */}
			<Field
				{...props}
				as="select"
				className={cn(
					'block w-full rounded-xl border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-opacity-25 disabled:bg-neutral-200',
					touched
						? error
							? 'border-red-500 focus:ring-red-500'
							: 'border-green-400 focus:ring-green-400'
						: 'border-gray-200 focus:ring-blackN'
				)}
				name={name}
			>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</Field>

			{/* Error Message */}
			<div className="mt-1 text-xs text-red-500">
				<ErrorMessage name={name} component="span" />
			</div>
		</label>
	);
}
