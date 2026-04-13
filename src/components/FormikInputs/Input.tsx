'use client';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import { cn } from '@common/utils/frontend/utils';

export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	name: string;
	label?: string | [string, string];
	placeholder?: string;
	fcClassName?: string;
}

export default function Input({ label, name, fcClassName, className, ...props }: TextInputProps) {
	const [, { error, touched }] = useField(name);
	return (
		<label className={cn('flex w-full flex-col gap-3', fcClassName)}>
			{/* Label Section */}
			{label ? (
				<>
					<span className="block font-medium">{Array.isArray(label) ? label[0] : label}</span>
					{Array.isArray(label) && <span className="block">{label[1]}</span>}
				</>
			) : null}

			{/* Input Field */}
			<Field
				{...props}
				className={cn(
					'block w-full rounded-xl border border-neutral-200 px-4 py-3 text-start focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-opacity-25 disabled:bg-neutral-200',
					className,
					touched
						? error
							? 'border-red-500 focus:ring-red-500'
							: 'border-green-400 focus:ring-green-400'
						: 'border-gray-200 focus:ring-blackN'
				)}
				name={name}
			/>

			{/* Error Message */}
			<ErrorMessage name={name} component="span" className="text-xs text-red-500" />
		</label>
	);
}
