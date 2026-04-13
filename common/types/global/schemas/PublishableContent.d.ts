declare interface WebsiteLinkedI<ID = string> {
	website: ID;
}
declare interface ActivatableI {
	enabled: boolean;
}
declare interface BasicPublishableI {
	name: LanguagesContentI;
}
declare interface BasicPublishableWithIdI<ID = string> extends BasicPublishableI {
	_id: ID;
}
declare interface BasicPublishableInformationI extends BasicPublishableI {
	slug: string;
	summary: LanguagesContentI;
}
declare interface BasicPublishableInformationWithIdI<ID = string> extends BasicPublishableInformationI {
	_id: ID;
}
declare interface PublishableStatesI extends ActivatableI {
	isPublished: boolean;
}
declare type PublishableStateI = Pick<PublishableStatesI, 'enabled'> | Pick<PublishableStatesI, 'isPublished'>;

declare interface PublishableContentI<ID = string, LABEL = string>
	extends WebsiteLinkedI<ID>,
		PublishableStatesI,
		BasicPublishableInformationI {
	tags: string[];
	label?: LABEL;
}
declare type PublishableLabelsI<LABEL = string> = Pick<PublishableContentI<string, LABEL>, 'label' | 'tags'>;
