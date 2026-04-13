import { cn } from '@common/utils/frontend/utils';
import React from 'react';

interface StarRatingProps {
	average: number;
	size?: string;
}

const StarRating: React.FC<StarRatingProps> = ({ average, size }) => {
	const fullStars = Math.floor(average); // Nombre d'étoiles pleines
	const halfStar = average - fullStars >= 0.5; // Indique s'il y a une demi-étoile
	const emptyStars = 5 - fullStars - (halfStar ? 1 : 0); // Nombre d'étoiles vides

	return (
		<div className="flex items-center">
			{/* Étoiles pleines */}
			{Array(fullStars)
				.fill(0)
				.map((_, index) => (
					<span
						key={`full-${index}`}
						className={cn(
							'icon-[solar--star-bold] text-secondaryY',
							size === 'lg' ? 'h-10 w-10' : 'h-6 w-6'
						)}
					/>
				))}
			{/* Demi-étoile */}
			{halfStar && (
				<span
					className={cn(
						'icon-[solar--star-bold-duotone] text-secondaryY',
						size === 'lg' ? 'h-10 w-10' : 'h-6 w-6'
					)}
				/>
			)}

			{/* Étoiles vides */}
			{Array(Math.max(0, emptyStars))
				.fill(0)
				.map((_, index) => (
					<span
						key={`full-${index}`}
						className={cn(
							'icon-[solar--star-broken] text-secondaryY opacity-35',
							size === 'lg' ? 'h-10 w-10' : 'h-6 w-6'
						)}
					/>
				))}
		</div>
	);
};

export default StarRating;
