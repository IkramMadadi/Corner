import React, { InputHTMLAttributes } from 'react';

interface RadioProps extends InputHTMLAttributes<HTMLInputElement> {
	label: string;
	id: string;
	name: string;
	value: string;
	checked: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Radio: React.FC<RadioProps> = ({ label, id, name, value, checked, onChange, ...props }) => {
	return (
		<label htmlFor={id} className="transparent flex cursor-pointer items-center gap-2 accent-primary">
			<input
				type="radio"
				id={id}
				name={name}
				value={value}
				checked={checked}
				onChange={onChange}
				className="form-radio border-neutral-300 text-primary focus:ring-primary"
				{...props}
			/>
			<span className="text-neutral-700" suppressHydrationWarning>
				{label}
			</span>
		</label>
	);
};

export default Radio;
