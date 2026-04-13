import Button from '#client/Buttons/Button';
import React from 'react';

export default function page() {
	return (
		<div className="container mx-auto flex flex-col items-center gap-8">
			<div className="flex items-center justify-center rounded-lg border p-2">
				<span className="icon-[ph--seal-check-light] h-16 w-16" />
			</div>
			<h1 className="text-3xl font-semibold md:text-5xl">All Done!</h1>
			<p className="max-w-sm text-center text-sm">Your password has been reset !</p>
			<Button
				href="/auth/"
				className="w-full gap-2 rounded-xl bg-primary text-lg text-white hover:cursor-pointer sm:py-4"
			>
				Go back to login
			</Button>
		</div>
	);
}
