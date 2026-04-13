declare interface MyFile {
	fileName: string;
	src: string;
	size: number;
	mimetype: string;
}
declare interface MyImageFile extends MyFile {
	width: number;
	height: number;
}

declare type MyEnum<U extends string> = Readonly<[U, ...U[]]>;
declare type Optional<T> = {
	[P in keyof T]?: T[P];
};
