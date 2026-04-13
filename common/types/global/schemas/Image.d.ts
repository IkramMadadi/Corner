declare interface ImageI {
	src: string;
	width: number;
	height: number;
}

declare interface CaptionedImageI extends ImageI {
	alt: string;
}
