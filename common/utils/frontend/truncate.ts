export function truncateText(input: string, maxLength = 80) {
	if (input.length <= maxLength) return input;

	// Find the last space within the allowed length
	const truncated = input.slice(0, maxLength + 1); // Add 1 to ensure we handle boundary cases
	const lastSpaceIndex = truncated.lastIndexOf(' ');

	// If there's no space, cut at maxLength
	return lastSpaceIndex > -1
		? `${truncated.slice(0, lastSpaceIndex)}...` // Cut at the last space
		: `${input.slice(0, maxLength)}...`; // If no space, cut at maxLength
}
