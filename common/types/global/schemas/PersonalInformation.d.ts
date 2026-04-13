declare type GendersT = 'M' | 'F';
declare type GendersNamesT = 'Male' | 'Female';
declare interface PersonalInformationI {
	firstName: string;
	lastName: string;
	gender?: GendersT;
	birthday?: Date | string;
	note?: string;
}
declare interface PublicPersonalInformationI<ID = string> extends PersonalInformationI {
	_id: ID;
}
