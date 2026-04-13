'use client';
import { useEffect, useMemo, useState } from 'react';
import { ErrorMessage, useField } from 'formik';

interface TextInputProps {
	name: string;
	label?: string | [string, string];
}
type ReleaseTypes = 'release' | 'alpha' | 'beta' | 'rc';
interface SelectOption<T> {
	value: T;
	label: string;
}
const releaseTypes: Record<ReleaseTypes, SelectOption<ReleaseTypes | ''>> = {
	release: {
		value: '',
		label: 'Release',
	},
	alpha: {
		value: 'alpha',
		label: 'Alpha',
	},
	beta: {
		value: 'beta',
		label: 'Beta',
	},
	rc: {
		value: 'rc',
		label: 'Release Candidate',
	},
};
const releaseTypesList = Object.keys(releaseTypes) as ReleaseTypes[];

export default function SemverInput({ label, name }: TextInputProps) {
	const [{ value }, { error, touched }, { setValue, setTouched }] = useField(name);
	const [major, setMajor] = useState<number>(parseInt(value.split('.')[0]) || 0);
	const [minor, setMinor] = useState<number>(parseInt(value.split('.')[1]) || 0);
	const [patch, setPatch] = useState<number>(parseInt(value.split('.')[2]?.split('-')[0]) || 0);
	const [versionType, setVersionType] = useState<ReleaseTypes>(
		(value.split('-')[1]?.split('.')[0] as ReleaseTypes) || 'release'
	);
	const [release, setRelease] = useState<number>(parseInt(value.split('-')[1]?.split('.')[1]) || 0);
	useEffect(() => {
		setValue(`${major}.${minor}.${patch}${versionType !== 'release' ? `-${versionType}.${release}` : ''}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [major, minor, patch, versionType]);
	const inputClassName = useMemo(
		() => `input input-bordered text-center w-1/4 ${touched ? (error ? 'input-error' : 'input-success') : ''}`,
		[error, touched]
	);
	const selectClassName = useMemo(
		() => `select select-bordered w-2/4 ${touched ? (error ? 'select-error' : 'select-success') : ''}`,
		[error, touched]
	);
	return (
		<label className="form-control w-full">
			<div className="label">
				{label ? (
					<>
						<span className="label-text">{Array.isArray(label) ? label[0] : label}</span>
						{Array.isArray(label) ? <span className="label-text-alt">{label[1]}</span> : null}
					</>
				) : null}
			</div>

			<div className="flex w-full items-end gap-2">
				<input
					type="number"
					className={inputClassName}
					value={major}
					onChange={(e) => setMajor(parseInt(e.target.value))}
					placeholder="0"
					onFocus={() => {
						setTouched(true);
					}}
					min={0}
				/>
				<span className="text-2xl">.</span>
				<input
					type="number"
					className={inputClassName}
					value={minor}
					onChange={(e) => setMinor(parseInt(e.target.value))}
					onFocus={() => {
						setTouched(true);
					}}
					placeholder="0"
					min={0}
				/>
				<span className="text-2xl">.</span>
				<input
					type="number"
					className={inputClassName}
					onFocus={() => {
						setTouched(true);
					}}
					value={patch}
					onChange={(e) => setPatch(parseInt(e.target.value))}
					placeholder="0"
					min={0}
				/>
				<span className="my-auto text-2xl">-</span>
				<select
					className={selectClassName}
					onFocus={() => {
						setTouched(true);
					}}
					value={versionType}
					onChange={(e) => setVersionType(e.target.value as ReleaseTypes)}
					disabled={major === 0 && minor === 0 && patch === 0}
				>
					{releaseTypesList.map((rt) => (
						<option key={rt} value={rt}>
							{releaseTypes[rt].label}
						</option>
					))}
				</select>
				{versionType !== 'release' ? (
					<>
						<span className="text-2xl">.</span>
						<input
							type="number"
							className={inputClassName}
							onFocus={() => {
								setTouched(true);
							}}
							value={release}
							onChange={(e) => setRelease(parseInt(e.target.value))}
							placeholder="0"
							min={0}
						/>
					</>
				) : null}
			</div>
			<div className="label">
				<ErrorMessage className="label-text-alt" name={name} component="span" />
			</div>
		</label>
	);
}
