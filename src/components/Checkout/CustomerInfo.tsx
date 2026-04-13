import { Section } from '#client/Section';
import { PersonalInformation } from './PersonalInformation';

export function CustomerInfo({ customer }: { customer: NecessaryCustomerI }) {
	return (
		<Section className="flex items-center gap-4 font-sans">
			<span className="icon-[hugeicons--user-status] h-16 w-16" />
			<PersonalInformation
				name={`${customer.personalInformation.firstName} ${customer.personalInformation.lastName}`}
				phone={customer.phone}
			/>
		</Section>
	);
}
