'use client';
import { DetailedHTMLProps, TextareaHTMLAttributes } from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import { cn } from '@common/utils/frontend/utils';
interface TextInputProps extends DetailedHTMLProps<TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> {
	name: string;
	label?: string | [string, string];
	placeholder?: string;
}
export default function Textarea({ label, name, ...props }: TextInputProps) {
	const [, { error, touched }] = useField(name);
	return (
		<label className="w-full">
			<div className="mb-2">
				{label ? (
					<>
						<span className="block font-medium">{Array.isArray(label) ? label[0] : label}</span>
						{Array.isArray(label) && <span className="block">{label[1]}</span>}
					</>
				) : null}
			</div>
			<Field
				rows={3}
				{...props}
				component="textarea"
				className={cn(
					'block w-full rounded-xl border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-opacity-25 disabled:bg-neutral-200',
					touched
						? error
							? 'border-red-500 focus:ring-red-500'
							: 'border-green-400 focus:ring-green-400'
						: 'border-gray-200 focus:ring-blackN',
					props.className
				)}
				name={name}
			/>
			<div className="mt-1 text-xs text-red-500">
				<ErrorMessage name={name} component="span" />
			</div>
		</label>
	);
}
