'use client';
import { useEffect, useState } from 'react';
import OtpInput from 'react-otp-input';
type TProps = {
	onChange: (value: string) => void;
};

export default function OTPInput({ onChange }: TProps) {
	const [otp, setOtp] = useState('');
	useEffect(() => {
		onChange(otp);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [otp]);
	return (
		<div className="flex w-full justify-center gap-6">
			<OtpInput
				value={otp}
				onChange={setOtp}
				onPaste={(e) => {
					const data = e.clipboardData.getData('text');
					setOtp(data);
				}}
				numInputs={6}
				containerStyle={{
					gap: '0.5rem',
				}}
				renderInput={(props) => (
					<input
						{...props}
						className={`bg-base-100 h-12 w-12 rounded-xl text-center outline outline-1 outline-slate-300 hover:outline-primary focus:outline-2 focus:outline-primary${otp.length > 0 ? 'outline-2 outline-primary hover:outline-primary' : ''}`}
						style={{}}
					/>
				)}
			/>
		</div>
	);
}
