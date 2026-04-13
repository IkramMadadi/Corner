'use client';
import { DetailedHTMLProps, InputHTMLAttributes } from 'react';
import { ErrorMessage, Field, useField } from 'formik';
export interface CheckboxProps extends DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement> {
	name: string;
	label?: string;
	placeholder?: string;
}
export default function Checkbox({ label = 'Remember me', name, ...props }: CheckboxProps) {
	const [, { error, touched }] = useField(name);
	return (
		<div className="form-control w-full">
			<label className="label cursor-pointer">
				<span className="label-text">{label}</span>
				<Field
					{...props}
					type="checkbox"
					name={name}
					className={'checkbox ' + (touched ? (error ? ' checkbox-error' : ' checkbox-primary') : '')}
				/>
			</label>
			<div className="label">
				<ErrorMessage className="label-text-alt" name={name} component="span" />
			</div>
		</div>
	);
}
