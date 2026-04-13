import { getCustomerAddresses } from '@common/actions/server/customer';
import CustomerAddress from './CustomerAddress';
import { CustomerInfo } from './CustomerInfo';

export default async function CustomerPersonalInformation({
	user,
	paymentsFees,
	locale,
}: {
	user: NecessaryCustomerI;
	paymentsFees: PaymentFeeI[];
	locale: LanguagesI;
}) {
	const response = await getCustomerAddresses(user._id, locale);
	if (!response.success) throw new Error(response.message);
	const addresses = response.data;
	return (
		<>
			<CustomerInfo customer={user} />
			<CustomerAddress addresses={addresses} paymentsFees={paymentsFees} />
		</>
	);
}
