'use client';
import { cn } from '@common/utils/frontend/utils';
import calculateTotalPoints from '@common/utils/global/Points';
import { useTranslations } from 'next-intl';
function getTier(tiers: LoyaltyTiersI, totalPoints: number) {
	if (totalPoints < tiers.bronze.min) return { min: 0, max: tiers.bronze.min };
	if (totalPoints < tiers.bronze.max) return tiers.bronze;
	if (totalPoints < tiers.silver.max) return tiers.silver;
	if (totalPoints < tiers.gold.max) return tiers.gold;
	return { min: tiers.gold.max, max: Number.POSITIVE_INFINITY };
}
export default function CustomerPoints({
	earnedPoints,
	tiers,
	bgColor = 'bg-primaryO',
}: {
	earnedPoints: EarnedPoints[];
	tiers: LoyaltyTiersI;
	bgColor?: string;
}) {
	const orderT = useTranslations('Order');
	const totalPoints = calculateTotalPoints(earnedPoints);
	const currentTier = getTier(tiers, totalPoints);
	return (
		<div className='mb-8 flex w-full items-center justify-center gap-4 p-4'>
			<h3 className='font-semibold'>{orderT('currentBalance')}</h3>
			<div className='w-1/2 max-w-72'>
				<div className='relative h-4 w-full overflow-hidden rounded-lg'>
					<div className={cn('h-full w-full bg-opacity-50', bgColor)} />
					<div
						className={cn('absolute left-0 top-0 h-full ', bgColor)}
						style={{
							transition: 'width  1s ease-in-out',
							width: `${Number.isFinite(currentTier.max) ? Math.floor((totalPoints * 100) / currentTier.max) : 100}%`,
						}}
					/>
				</div>
			</div>
			<div className='flex'>
				<span className='icon-[fluent-color--reward-16] h-6 w-6' />
				<p>
					<span className=''>{totalPoints} Pts</span>/
					<span className='font-semibold'>{currentTier.max} Pts</span>
				</p>
			</div>
		</div>
	);
}
