'use client';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import { cn } from '@common/utils/frontend/utils';

export interface RadioInputProps<T extends string | number>
	extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	name: string;
	label?: string | [string, string];
	fcClassName?: string;
	rcClassName?: string;
	options: { label: string; value: T }[];
}

export default function Radio<T extends string | number>({
	label,
	name,
	options,
	fcClassName,
	rcClassName = 'flex gap-2 flex-wrap',
	...props
}: RadioInputProps<T>) {
	const [, { error, touched }] = useField(name);

	return (
		<div className={cn('w-full', fcClassName)}>
			{/* Label Section */}
			<div className="mb-2">
				{label ? (
					<>
						<span className="block font-medium">{Array.isArray(label) ? label[0] : label}</span>
						{Array.isArray(label) && <span className="block">{label[1]}</span>}
					</>
				) : null}
			</div>

			{/* Radio Buttons */}
			<div className={rcClassName}>
				{options.map((option) => (
					<label
						key={option.value}
						className={cn(
							'flex items-center gap-2 rounded-xl py-2 accent-primary',
							touched ? (error ? 'border-red-500' : 'border-green-400') : 'border-neutral-200'
						)}
					>
						<Field
							{...props}
							type="radio"
							name={name}
							value={option.value}
							className="border-neutral-300 text-primary focus:outline-none focus:ring-0 focus:ring-primary"
						/>
						<span suppressHydrationWarning>{option.label}</span>
					</label>
				))}
			</div>

			{/* Error Message */}
			<div className="mt-1 text-xs text-red-500">
				<ErrorMessage name={name} component="span" />
			</div>
		</div>
	);
}
