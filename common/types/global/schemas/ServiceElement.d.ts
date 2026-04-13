declare interface ServiceElementI {
	title: LanguagesContentI;
	description: LanguagesContentI;
	image: CaptionedImageI; // URL or path to image
}
declare interface RatedServiceElementI extends ServiceElementI {
	rating: number;
}
declare interface PublicServiceElementI extends ServiceElementI {
	_id: string; // Unique identifier for the service element
	createdAt: Date; // Timestamp of creation
	updatedAt: Date; // Timestamp of last update
}
declare interface PublicRatedServiceElementI extends RatedServiceElementI {
	_id: string; // Unique identifier for the service element
	createdAt: Date; // Timestamp of creation
	updatedAt: Date; // Timestamp of last update
}
