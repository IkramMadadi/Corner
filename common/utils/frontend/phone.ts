export function updatePhoneNumber(phoneNumber: string) {
	if (!phoneNumber) return phoneNumber;
	if (phoneNumber[0] === '0') return `+213${phoneNumber.slice(1, phoneNumber.length)}`;
	if (phoneNumber[0] !== '+') return `+213${phoneNumber}`;
	return phoneNumber;
}
