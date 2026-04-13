import type { FC } from 'react';
import React from 'react';
import ProgressBar from '#client/ProgressBar';
import StarRating from '#client/StarRating';
import NumbersFormatter from '@common/utils/frontend/NumbersFormatter';

interface RatingsProps {
	ratings: RatingAggregationI;
}

const Ratings: FC<RatingsProps> = ({ ratings }) => {
	return (
		<div className="flex flex-col items-center gap-4 lg:order-last lg:col-span-2">
			<div className="flex w-full justify-between">
				<StarRating size="lg" average={ratings.average} />
				<p className="text-3xl font-semibold">{NumbersFormatter.format(ratings.average)} </p>
			</div>

			<hr className="order w-full border-neutral-300" />

			<div className="flex w-full flex-col gap-3 font-medium">
				{ratings.distribution.map((rating, i) => (
					<div key={'ratings' + i} className="flex items-center gap-8">
						<p>{i + 1}</p>
						<ProgressBar value={(rating / ratings.count) * 100} />
						<p>{rating}</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Ratings;
