'use client';

import { cn } from '@common/utils/frontend/utils';
import type { Route } from 'next';
import { Link } from '@client/i18n/routing';
import type { ButtonHTMLAttributes, ForwardedRef, ReactNode } from 'react';
import { useMemo, forwardRef } from 'react';
import { useLocale } from 'next-intl';

export interface ButtonProps {
	className?: string;
	translate?: string;
	sizeClass?: string;
	fontSize?: string;
	radius?: string;
	loading?: boolean;
	disabled?: boolean;
	type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
	href?: Route;
	onClick?: () => void;
	children?: ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
	className = 'text-neutral-200 disabled:cursor-not-allowed',
	translate = '',
	sizeClass = 'py-1.5 px-4 sm:py-2 sm:px-6',
	fontSize = 'text-xs sm:text-sm',
	disabled = false,
	radius = 'rounded-full',
	href,
	children,
	type,
	loading,
	onClick = () => {},
}, ref: ForwardedRef<HTMLButtonElement>) => {
	const locale = useLocale();
	const CLASSES = useMemo(
		() =>
			cn(
				'font-sans relative flex items-center gap-2 justify-center transition-colors duration-300 hover:cursor-hover disabled:cursor-not-allowed disabled:opacity-50',
				radius,
				fontSize,
				sizeClass,
				translate,
				className
			),
		[className, fontSize, radius, sizeClass, translate]
	);

	const renderLoading = () => (
		<svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
			<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
			<path
				className="opacity-75"
				fill="currentColor"
				d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
			/>
		</svg>
	);

	if (href) {
		return (
			<Link locale={locale} href={href} className={`${CLASSES}`} onClick={onClick}>
				{children || `This is Link`}
			</Link>
		);
	}

	return (
		<button
			ref={ref}
			disabled={disabled || loading}
			className={`${CLASSES}`}
			onClick={onClick}
			type={type}
		>
			{loading && renderLoading()}
			{children || `This is Button`}
		</button>
	);
});

Button.displayName = 'Button';

export default Button;
