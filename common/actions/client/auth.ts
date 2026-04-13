'use client';

import { loginErrors } from '@common/messages/auth';
import { signIn, signOut } from 'next-auth/react';

/* export async function doSocialLogin(formData: FormData) {
	const action = formData.get('action');
	await signIn(action, { redirectTo: '/home' });
}
 */
export async function doLogout() {
	await signOut({ redirect: true, callbackUrl: '/' });
}

export async function doCredentialLogin(loginData: CustomerLoginI & { locale: LanguagesI }) {
	const response = await signIn('credentials', {
		email: loginData.email,
		password: loginData.password,
		redirect: false,
		locale: loginData.locale,
		//callbackUrl: '/',
	});
	if (!response) throw new Error(loginErrors['wrong-password-or-email'][loginData.locale]);
	return response;
}
export async function register(body: CustomerRegisterI) {
	try {
		const response = await fetch('/api/register', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});

		const message = await response.text();
		if (response.status === 201) return message;

		throw new Error(message);
	} catch (error) {
		throw new Error((error as Error).message);
	}
}
export async function createForgotPasswordSession(body: OTPSessionI) {
	try {
		const response = await fetch('/api/forgot-password', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		const message = await response.text();

		if (response.status === 200) return message;

		throw new Error(message);
	} catch (error) {
		throw new Error((error as Error).message);
	}
}

export async function resetPassword(body: ResetPasswordI) {
	try {
		const response = await fetch('/api/reset-password', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		const message = await response.text();
		if (response.status === 200) {
			return message;
		}
		throw new Error(message);
	} catch (error) {
		throw new Error((error as Error).message);
	}
}

export async function verifyRecoverySession(body: OTPSessionSendI) {
	try {
		const response = await fetch('/api/verify-otp', {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(body),
		});
		const message = await response.text();
		if (response.status === 200) {
			return message;
		}
		throw new Error(message);
	} catch (error) {
		throw new Error((error as Error).message);
	}
}
