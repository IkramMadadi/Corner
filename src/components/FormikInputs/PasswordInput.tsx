'use client';
import { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react';
import { ErrorMessage, Field, useField } from 'formik';
import { cn } from '@common/utils/frontend/utils';
import { useLocale } from 'next-intl';

export interface TextInputProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	name: string;
	label?: string | [string, string];
	placeholder?: string;
	fcClassName?: string;
}

export default function PasswordInput({ label, name, fcClassName, ...props }: TextInputProps) {
	const locale = useLocale();

	const [, { error, touched }] = useField(name);
	const [showPassword, setShowPassword] = useState(false);
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
			<div className="relative">
				<Field
					{...props}
					type={showPassword ? 'text' : 'password'}
					className={cn(
						'block w-full rounded-xl border border-neutral-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-opacity-25 disabled:bg-neutral-200',
						touched
							? error
								? 'border-red-500 focus:ring-red-500'
								: 'border-green-400 focus:ring-green-400'
							: 'border-gray-200 focus:ring-blackN'
					)}
					name={name}
				/>
				<button
					type="button"
					className={`absolute flex ${locale === 'ar' ? 'left-3 top-1/2 -translate-y-1/2' : 'right-3 top-1/2 -translate-y-1/2'} `}
					onClick={() => setShowPassword((prev) => !prev)}
				>
					<span
						className={cn(
							'h-6 w-6',

							showPassword ? 'icon-[solar--eye-closed-bold-duotone]' : 'icon-[solar--eye-line-duotone]'
						)}
					/>
				</button>
			</div>

			{/* Error Message */}
			<div className="mt-1 text-xs text-red-500">
				<ErrorMessage name={name} component="span" />
			</div>
		</label>
	);
}
