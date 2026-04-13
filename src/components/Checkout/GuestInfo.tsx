'use client';
import { Section } from '#client/Section';
//import useCart from ':common/useCart';
//import { PersonalInformation } from './PersonalInformation';
import { GuestForm } from './GuestForm';

export default function GuestInfo() {
	// const { guest } = useCart();

		{/*
		<div className="space-y-6">
			<Section className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-indigo-50 shadow-sm">
				<div className="flex items-center gap-4">
					<PersonalInformation
					name={guest?.name }
					phone={guest?.phone}
					/>
				</div>
			</Section>	
		</div>
		*/}
		
		return (
			<Section className="flex flex-col gap-4">
				<GuestForm />
			</Section>
		);
	}
