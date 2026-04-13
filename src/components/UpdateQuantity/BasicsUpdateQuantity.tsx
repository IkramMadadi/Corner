'use client';
import ButtonCircle from '../Buttons/ButtonCircle';
import { Minus, Plus } from 'lucide-react';

export default function BasicsUpdateQuantity({
	handleQuantityChange,
	quantity,
}: {
	handleQuantityChange: (count: number) => void;
	quantity: number;
}) {
	return (
		/* update quantity */
		<div className="flex w-full items-center gap-4">
			<ButtonCircle
				className="h-8 w-8 rounded-full border-2 transition-colors hover:bg-gray-50"
				onClick={() => handleQuantityChange(-1)}
				disabled={quantity <= 1}
			>
				<Minus className="h-4 w-4" />
				<span className="sr-only">Decrease quantity</span>
			</ButtonCircle>

			<div className="flex min-w-[2rem] items-center justify-center">
				<span className="text-lg font-medium text-gray-900">{quantity}</span>
			</div>

			<ButtonCircle
				className="h-8 w-8 rounded-full border-2 transition-colors hover:bg-gray-50"
				onClick={() => handleQuantityChange(+1)}
				disabled={quantity >= 99}
			>
				<Plus className="h-4 w-4" />
				<span className="sr-only">Increase quantity</span>
			</ButtonCircle>
		</div>
	);
}
