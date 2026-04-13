'use client';

import { useEffect, useRef } from 'react';

interface AutoSaveProps {
	information: RegisterGuestI;
	products: ProductsCartI<string>[];
}

export function useAutoSaveSession({ information, products }: AutoSaveProps) {
	const sessionIdRef = useRef<string | null>(null);

	useEffect(() => {
		const stored = localStorage.getItem('currentSessionId');
		if (stored) {
			sessionIdRef.current = stored;
		}
	}, []);

	const isSavingRef = useRef(false);
	const lastSavedRef = useRef<string>('');

	useEffect(() => {
		// ✅ عند أول mount، استرجع sessionId من localStorage
		const stored = localStorage.getItem('currentSessionId');
		if (stored && !sessionIdRef.current) {
			sessionIdRef.current = stored;
		}
	}, []);

	useEffect(() => {
		const saveSession = async () => {
			// ✅ منع الاستدعاءات المتزامنة
			if (isSavingRef.current) return;

			const phone = (information.phone || '').replace(/\s/g, '');

			// ✅ التحقق من صحة الهاتف
			if (phone.length !== 10) return;
			if (!products || products.length === 0) return;

			// ✅ تجنب إعادة الإرسال لنفس البيانات
			const fingerprint = JSON.stringify({
				name: information.name,
				phone,
				products,
			});

			if (fingerprint === lastSavedRef.current) return;

			isSavingRef.current = true;

			try {
				const payload = {
					sessionId: sessionIdRef.current || undefined,
					information: { ...information, phone },
					products,
				};

				const response = await fetch('/api/checkout/session/save', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(payload),
				});

				if (response.ok) {
					const data = await response.json();

					if (data.sessionId) {
						sessionIdRef.current = data.sessionId;
						localStorage.setItem('currentSessionId', data.sessionId);
						lastSavedRef.current = fingerprint;
					}
				}
			} catch (error) {
				console.error('Session auto-save failed:', error);
			} finally {
				isSavingRef.current = false;
			}
		};

		saveSession();
	}, [information, products]);

	// ✅ تنظيف عند unmount (اختياري)
	useEffect(() => {
		return () => {
			isSavingRef.current = false;
		};
	}, []);
}
