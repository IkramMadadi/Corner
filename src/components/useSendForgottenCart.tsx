'use client';

import { checkoutAsGuestWithSessionValidationSchema } from '^common/models/cart';
import { useEffect } from 'react';
import { ZodError } from 'zod';

type ForgottenSession = {
	sessionId?: string;
	information: RegisterGuestI;
	products: SessionCartI;
	done: boolean;
};

export function useSendForgottenCart() {
	useEffect(() => {
		async function validateAndSend() {
			if (typeof window === 'undefined') return;

			const sessionStr = localStorage.getItem('forgottenCart');
			if (!sessionStr) return;

			let session: ForgottenSession;

			try {
				session = JSON.parse(sessionStr);
			} catch {
				localStorage.removeItem('forgottenCart');
				return;
			}

			if (!session || typeof session !== 'object') return;
			if (session.done) return;

			const { sessionId, information } = session;
			const products = Array.isArray(session.products) ? session.products : [];

			if (!products.length) {
				localStorage.removeItem('forgottenCart');
				return;
			}

			try {
				await checkoutAsGuestWithSessionValidationSchema('fr').parseAsync({
					information,
					products,
					sessionId,
				});

				const response = await fetch('/api/checkout/session/save', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						sessionId,
						information,
						products,
					}),
				});

				if (response.status === 201) {
					localStorage.removeItem('forgottenCart');
					console.info('🟢 Forgotten cart successfully saved & cleared.');
				} else {
					console.warn('🔴 Failed to save forgotten cart. Status:', response.status);
				}
			} catch (error: unknown) {
				if (error instanceof ZodError) {
					localStorage.removeItem('forgottenCart');
					return;
				}

				if (error instanceof Error) {
					console.error('❌ Forgotten cart fetch error:', error.message);
				} else {
					console.error('❌ Forgotten cart fetch error:', error);
				}
			}
		}

		validateAndSend();
	}, []);
}
