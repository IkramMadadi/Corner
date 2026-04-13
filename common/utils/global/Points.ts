export default function calculateTotalPoints<ID = string>(earnedPoints: EarnedPoints<ID>[]) {
	return getOnlyValidPoints(earnedPoints).reduce(
		(total, pointBatch) => total + (pointBatch.amount - (pointBatch.redeemed || 0)),
		0
	); // Sum unredeemed points
}

export function getOnlyValidPoints<ID = string>(earnedPoints: EarnedPoints<ID>[]) {
	const now = new Date();
	return earnedPoints.filter(
		pointBatch => new Date(pointBatch.expirationDate) > now && pointBatch.amount > (pointBatch.redeemed || 0)
	); // Only consider unexpired points
}
