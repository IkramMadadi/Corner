import React from 'react';

export default function BlobImage({ image, className, baseId }: { image: string; className?: string; baseId: string }) {
	return (
		<svg
			viewBox="0 0 471 479"
			fill="none"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
			xmlnsXlink="http://www.w3.org/1999/xlink"
		>
			<g filter={`url(#filter_${baseId})`}>
				<path
					d="M380.241 69.9235C322.987 72.8756 307.281 22.6264 259.045 10.862C207.676 -1.67233 184.49 29.5125 179.001 55.0099C174.769 74.6649 165.874 83.1966 142.43 88.6617C125.72 91.7304 110.914 100.423 114.792 124.266C118.671 148.109 110.81 162.345 99.1079 170.874C87.4061 179.405 76.4887 191.515 72.649 207.291C66.1453 233.997 79.3664 261.969 103.733 274.371C131.115 288.011 145.821 302.943 143.898 333.911C143.417 341.651 146.644 382.83 185.794 370.383C195.681 367.24 236.585 346.039 261.408 385.387C267.588 395.184 282.893 404.825 296.878 408.241C334.382 417.389 372.726 389.714 376.533 351.607C380.664 323.41 385.788 310.188 416.238 320.037C446.367 329.782 464.396 287.803 447.538 266.268C424.141 241.997 452.06 198.347 460.926 161.925C473.045 112.14 430.216 64.5015 380.241 69.9235Z"
					fill={`url(#pattern_${baseId})`}
				/>
				<path
					d="M380.241 69.9235C322.987 72.8756 307.281 22.6264 259.045 10.862C207.676 -1.67233 184.49 29.5125 179.001 55.0099C174.769 74.6649 165.874 83.1966 142.43 88.6617C125.72 91.7304 110.914 100.423 114.792 124.266C118.671 148.109 110.81 162.345 99.1079 170.874C87.4061 179.405 76.4887 191.515 72.649 207.291C66.1453 233.997 79.3664 261.969 103.733 274.371C131.115 288.011 145.821 302.943 143.898 333.911C143.417 341.651 146.644 382.83 185.794 370.383C195.681 367.24 236.585 346.039 261.408 385.387C267.588 395.184 282.893 404.825 296.878 408.241C334.382 417.389 372.726 389.714 376.533 351.607C380.664 323.41 385.788 310.188 416.238 320.037C446.367 329.782 464.396 287.803 447.538 266.268C424.141 241.997 452.06 198.347 460.926 161.925C473.045 112.14 430.216 64.5015 380.241 69.9235Z"
					stroke="white"
					strokeWidth="6"
				/>
			</g>
			<defs>
				<filter
					id={`filter_${baseId}`}
					x="-0.000793457"
					y="0.000976562"
					width="471.003"
					height="479.001"
					filterUnits="userSpaceOnUse"
					colorInterpolationFilters="sRGB"
				>
					<feFlood floodOpacity="0" result="BackgroundImageFix" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dx="-3" dy="3" />
					<feGaussianBlur stdDeviation="4" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.85098 0 0 0 0 0.352941 0 0 0 0 0.509804 0 0 0 0.1 0"
					/>
					<feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_1662_931" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dx="-11" dy="10" />
					<feGaussianBlur stdDeviation="7.5" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.85098 0 0 0 0 0.352941 0 0 0 0 0.509804 0 0 0 0.09 0"
					/>
					<feBlend mode="normal" in2="effect1_dropShadow_1662_931" result="effect2_dropShadow_1662_931" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dx="-25" dy="23" />
					<feGaussianBlur stdDeviation="10.5" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.85098 0 0 0 0 0.352941 0 0 0 0 0.509804 0 0 0 0.05 0"
					/>
					<feBlend mode="normal" in2="effect2_dropShadow_1662_931" result="effect3_dropShadow_1662_931" />
					<feColorMatrix
						in="SourceAlpha"
						type="matrix"
						values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
						result="hardAlpha"
					/>
					<feOffset dx="-44" dy="42" />
					<feGaussianBlur stdDeviation="12" />
					<feColorMatrix
						type="matrix"
						values="0 0 0 0 0.85098 0 0 0 0 0.352941 0 0 0 0 0.509804 0 0 0 0.01 0"
					/>
					<feBlend mode="normal" in2="effect3_dropShadow_1662_931" result="effect4_dropShadow_1662_931" />
					<feBlend mode="normal" in="SourceGraphic" in2="effect4_dropShadow_1662_931" result="shape" />
				</filter>
				<pattern id={`pattern_${baseId}`} patternContentUnits="objectBoundingBox" width="1" height="1">
					<use
						xlinkHref={`#image_data_${baseId}`}
						transform="matrix(0.000341763 0 0 0.000333262 0 -0.18252)"
					/>
				</pattern>
				<image id={`image_data_${baseId}`} width="2926" height="4096" xlinkHref={image} />
			</defs>
		</svg>
	);
}
