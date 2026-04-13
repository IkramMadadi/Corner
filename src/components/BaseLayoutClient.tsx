'use client';

import { ReactNode } from 'react';
// import { useSendForgottenCart } from './useSendForgottenCart';

interface BaseLayoutClientProps {
	children: ReactNode;
}

export default function BaseLayoutClient({ children }: BaseLayoutClientProps) {
	// Hook to handle forgotten cart functionality
	//useSendForgottenCart();

	return <>{children}</>;
}
