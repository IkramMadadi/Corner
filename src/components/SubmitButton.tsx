import React from 'react';
import { useFormStatus } from 'react-dom';

export default function SubmitButton() {
	const { pending } = useFormStatus();
	return (
		<button
			type="submit"
			{...(pending && { disabled: true })}
			className={`w-62 mt-10 h-10 rounded bg-blue-400 p-2 font-bold text-white ${
				pending ? 'cursor-not-allowed' : 'cursor-pointer'
			}`}
		>
			{pending ? 'Adding...' : 'Add Todo'}
		</button>
	);
}
