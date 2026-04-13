'use client';
import { ResetContext } from '@common/contexts/reset';
import { useEffect, useState, type ReactNode } from 'react';
const isServer = typeof window === 'undefined';

export default function ResetProvider({
	children,
	sessionId,
	customer,
}: {
	sessionId: string;
	children: ReactNode;
	customer: NecessaryCustomerI;
}) {
	const [otp, setOtp] = useState('');
	useEffect(() => {
		if (isServer) return;
		const otp = window.sessionStorage.getItem('otp');
		if (otp) {
			setOtp(otp);
		}
	}, []);
	useEffect(() => {
		if (isServer) return;
		if (otp) {
			window.sessionStorage.setItem('otp', otp);
		}
	}, [otp]);
	return <ResetContext.Provider value={{ sessionId, otp, setOtp, customer }}>{children}</ResetContext.Provider>;
}
