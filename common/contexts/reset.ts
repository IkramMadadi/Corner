'use client';
import { createContext } from 'react';

interface ResetContextType {
	sessionId: string;
	otp: string;
	setOtp: (otp: string) => void;
	customer: NecessaryCustomerI;
}
export const ResetContext = createContext<ResetContextType | null>(null);
