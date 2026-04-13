'use client';
import { ResetContext } from '@common/contexts/reset';
import { useContext } from 'react';

export default function useReset() {
	const resetContext = useContext(ResetContext);
	if (!resetContext) {
		throw new Error('useReset must be used within a ResetProvider');
	}
	return resetContext;
}
