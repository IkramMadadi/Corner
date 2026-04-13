import React from 'react';
import OrdersHistory from './OrdersHistory';
import { loadCustomerOrders, loadCustomerPoints } from '@common/actions/server/customer';
import { getSession } from '@client/auth.config';
import loadWebsiteData from '~common/websiteCache';
import CustomerPoints from '#common/CustomerPoints';

export default async function page({ params }: { params: Promise<{ locale: LanguagesI }> }) {
	const { locale } = await params;
	const [session, website] = await Promise.all([getSession(), loadWebsiteData()]);
	if (!session) throw new Error('You have to be connected');
	const [orderResponse, earnedPointsResponse] = await Promise.all([
		loadCustomerOrders(session.user._id, locale),
		loadCustomerPoints(session.user._id, locale),
	]);
	if (!orderResponse.success) throw new Error(orderResponse.message);
	if (!earnedPointsResponse.success) throw new Error(earnedPointsResponse.message);
	return (
		<>
			<CustomerPoints
				bgColor="bg-secondaryY"
				earnedPoints={earnedPointsResponse.data}
				tiers={website.loyaltyProgram.tiers}
			/>
			<OrdersHistory orders={orderResponse.data} daysToDeliver={website.deliverySettings.daysToDeliver} />
		</>
	);
}
