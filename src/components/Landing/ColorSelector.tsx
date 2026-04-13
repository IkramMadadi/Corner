'use client';

import useProductDetails from '@common/hooks/useProductDetails';

export default function ColorSelector() {
	const { product, locale, quantity, colorSelections, setColorSelections } = useProductDetails();

	const colors = product.additional?.colors;

	if (!colors || colors.length === 0) return null;

	const handleSelectColor = (unitIndex: number, color: VariantI) => {
		if (color.available === false) return;

		setColorSelections((prev) => {
			const updated = [...prev];
			updated[unitIndex] = color._id;
			return updated;
		});
	};

	return (
		<div dir={locale === 'ar' ? 'rtl' : 'ltr'} className="w-full space-y-5">
			{Array.from({ length: quantity }, (_, unitIndex) => {
				const selectedColorId = colorSelections[unitIndex];
				const selectedColor = colors.find((c) => c._id === selectedColorId);

				return (
					<div key={unitIndex} className="w-full py-2">
						{/* Header */}
						<div className="mb-4 flex items-center gap-2">
							<span className="icon-[solar--palette-bold] h-[18px] w-[18px] text-amber-500" />

							{quantity > 1 && (
								<span className="flex h-5 w-5 items-center justify-center rounded-full bg-gray-900 text-[11px] font-semibold text-white">
									{unitIndex + 1}
								</span>
							)}

							<span className="text-[14px] font-bold uppercase tracking-wide text-gray-700">
								{locale === 'ar' ? 'اللون' : locale === 'fr' ? 'Couleur' : 'Color'}
							</span>

							{/* Selected color name badge - inline with header */}
							{selectedColor && (
								<span className="rounded-full bg-gray-100 px-3 py-1 text-[13px] font-semibold text-gray-700">
									{selectedColor.label?.[locale] || selectedColor.label?.en}
								</span>
							)}
						</div>

						{/* Swatches grid */}
						<div className="flex flex-wrap gap-3">
							{colors.map((color) => {
								const isSelected = selectedColorId === color._id;
								const isDisabled = color.available === false;
								const light = isLightColor(String(color.value));

								return (
									<button
										key={color._id}
										type="button"
										disabled={isDisabled}
										onClick={() => handleSelectColor(unitIndex, color)}
										title={color.label?.[locale] || color.label?.en || ''}
										aria-label={`${color.label?.[locale] || color.value}`}
										className={[
											'group relative flex flex-col items-center gap-1.5',
											'focus-visible:outline-none',
											isDisabled ? 'cursor-not-allowed opacity-40' : 'cursor-pointer',
										].join(' ')}
									>
										{/* Swatch circle */}
										<div
											className={[
												'relative flex h-12 w-12 items-center justify-center rounded-full',
												'transition-all duration-200 ease-out',
												isDisabled
													? ''
													: isSelected
														? 'ring-[3px] ring-gray-800 ring-offset-[3px]'
														: 'ring-1 ring-gray-300 ring-offset-1 hover:ring-2 hover:ring-gray-400 hover:ring-offset-2',
											].join(' ')}
										>
											{/* Color fill */}
											<span
												className="absolute inset-0 rounded-full"
												style={{ background: String(color.value) }}
											/>

											{/* Light color inner border */}
											{light && (
												<span className="absolute inset-0 rounded-full ring-1 ring-inset ring-gray-200" />
											)}

											{/* Checkmark */}
											{isSelected && (
												<svg
													className={[
														'relative z-10 h-5 w-5 drop-shadow',
														light ? 'text-gray-900' : 'text-white',
													].join(' ')}
													viewBox="0 0 24 24"
													fill="none"
													stroke="currentColor"
													strokeWidth={3}
													strokeLinecap="round"
													strokeLinejoin="round"
												>
													<path d="M5 13l4 4L19 7" />
												</svg>
											)}

											{/* Disabled slash */}
											{isDisabled && (
												<span className="absolute inset-0 z-10 flex items-center justify-center">
													<span className="h-[2px] w-8 rotate-45 rounded bg-red-500/80" />
												</span>
											)}
										</div>

										{/* Color label under swatch */}
										<span
											className={[
												'max-w-[56px] truncate text-center text-[10px] leading-tight',
												'transition-colors duration-150',
												isSelected
													? 'font-bold text-gray-900'
													: 'font-medium text-gray-400 group-hover:text-gray-600',
											].join(' ')}
										>
											{color.label?.[locale] || color.label?.en}
										</span>
									</button>
								);
							})}
						</div>

						{!selectedColor && (
							<p className="mt-3 text-[13px] font-medium text-amber-600">
								{locale === 'ar'
									? '⬆ يرجى اختيار لون'
									: locale === 'fr'
										? '⬆ Veuillez choisir une couleur'
										: '⬆ Please pick a color'}
							</p>
						)}
					</div>
				);
			})}
		</div>
	);
}

function isLightColor(hex: string): boolean {
	if (hex.includes('gradient')) return false;
	const color = hex.replace('#', '');
	if (color.length < 6) return false;
	const r = parseInt(color.substring(0, 2), 16);
	const g = parseInt(color.substring(2, 4), 16);
	const b = parseInt(color.substring(4, 6), 16);
	return (0.299 * r + 0.587 * g + 0.114 * b) / 255 > 0.5;
}
